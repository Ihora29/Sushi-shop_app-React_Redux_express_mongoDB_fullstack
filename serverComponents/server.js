const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, ".env") });
const cors = require('cors');
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 5000;
const app = express();
const bcrypt = require('bcryptjs');
const { ProductModel, UserModel, OrdersUserModel } = require('./dataModelSchema/schemaModel');
const jwt = require("jsonwebtoken");


const secretKey = process.env.SECRETKEY;
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.mongoConnect)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('err=>', err));

app.get('/', (req, res) => {
    res.end('hello from server!')
});

const middlRegUser = async (req, res, next) => {
    try {
        const isUserExist = await UserModel.findOne({ email: req.body.email });
        if (isUserExist) return res.status(400).json({ msg: "User already exists" });
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        next()
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

const middleLogUser = async (req, res, next) => {


}

const middlCheckToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "No token" });
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Token expired or invalid" });
    }
}

app.get('/auth/check', middlCheckToken, (req, res) => {
    res.json(req.user)
})

app.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
});

app.post('/login', async (req, res) => {
    try {

        const userFind = await UserModel.findOne({ email: req.body.email });
        if (!userFind) return res.status(400).json({ error: "User not found" });
        const isMatch = await bcrypt.compare(req.body.password, userFind.password);
        if (!isMatch) return res.status(400).json({ error: "Password error!" });
        const token = jwt.sign(
            { _id: userFind._id, email: req.body.email, firstName: userFind.firstName, secondName: userFind.secondName, phone: userFind.phone },
            secretKey,
            { expiresIn: "2h" }
        );
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true,
            // sameSite: 'strict',
            maxAge: 120 * 60 * 1000
        });

        res.status(200).send('verefication completed')

    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

app.post('/register', middlRegUser, async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(201).json({ message: "User created", user: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.patch('/auth/check', middlCheckToken, async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded._id;
    try {
        const userUpd = await UserModel.findOneAndUpdate({ _id: userId },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        res.json(userUpd);
    } catch (error) {
        console.log(error);

    }

});

app.patch('/change-password', middlCheckToken, async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded._id;
    const { password, oldPassword } = req.body;
    const user = await UserModel.findById(userId);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Старий пароль невірний' });
    } else {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userUpd = await UserModel.findOneAndUpdate({ _id: userId },
                { $set: { password: hashedPassword } },
                { new: true, runValidators: true });
            res.status(200).json({ msg: 'mabariLike' })
            if (!userUpd) return res.status(400).json({ msg: "User not found" });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }


})

app.get('/products', async (req, res) => {
    try {
        const productsList = await ProductModel.find();
        res.json(productsList)

    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})


app.post('/add-order', async (req, res) => {

    try {
        const newOrder = new OrdersUserModel(req.body);
        await newOrder.save();
        res.status(201).json({ message: "newOrder created", newOrder: newOrder });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/add-order', middlCheckToken, async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, secretKey);
    try {
        const ordersList = await OrdersUserModel.find({ phone: decoded.phone });
        res.json(ordersList)
    } catch (error) {
        console.log(error);
    }
});

app.get('/users', async (req, res) => {
    const usersList = await UserModel.find();

    res.json(usersList)
});

app.get('/users/:id', async (req, res) => {
    const userById = await UserModel.findById(req.params.id);
    if (!userById) {
        res.end('user not found')
    }
    res.json(userById);
});

app.listen(PORT, () => {
    console.log(`server runing on ${PORT}`);
}).on('error', (err) => {
    console.error("Port error:", err.message);
});