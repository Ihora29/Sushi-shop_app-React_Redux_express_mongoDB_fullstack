const { middlRegUser } = require('./middlwares/middlwareRegister');
const { middleLogUser } = require('./middlwares/middlwareLogin');
const { middlCheckToken } = require('./middlwares/middlewareToken')
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
//const Joi = require('joi');


const secretKey = process.env.SECRETKEY;



app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.mongoConnect)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('err=>', err));

// app.get('/', (req, res) => {
//     res.end('hello from server!')
// });

// const schemaValidReg = Joi.object({
//     firstName: Joi.string().trim().min(2).max(20),
//     secondName: Joi.string().trim().min(2).max(20),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).required(),
//     status: Joi.string().valid('login-user', 'admin-user').default('login-user'),
//     phone: Joi.string()
// })

// const middlRegUser = async (req, res, next) => {

//     if (!req.body || Object.keys(req.body).length === 0) {
//         // console.log("без боді");
//         return res.status(400).json({ message: 'bad request' })

//     }
//     const { error, value } = schemaValidReg.validate(req.body, { abortEarly: false });
//     if (error) {
//         console.log('error in valid');
//         return res.status(400).send(error.message)
//     }
//     try {
//         const isUserExist = await UserModel.findOne({ email: req.body.email });
//         if (isUserExist) return res.status(400).json({ msg: "User already exists" });
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         req.body.password = hashedPassword;
//         next()
//     }
//     catch (error) {
//         return res.status(500).json({ error: error.message });
//     }

// }

// const schemaValidLogin = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).required()
// })

// const middleLogUser = async (req, res, next) => {
//     if (!req.body || Object.keys(req.body).length === 0) {
//         // console.log("без боді");
//         return res.status(401).json({ message: 'user Unauthorized' })

//     }
//     const { error, value } = schemaValidLogin.validate(req.body, { abortEarly: false });

//     if (error) {
//         console.log('error in valid');
//         return res.status(400).send(error.message)
//     }
//     next()
// }

// const middlCheckToken = async (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).json({ msg: "No token" });
//     try {
//         const decoded = jwt.verify(token, secretKey);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.status(401).json({ msg: "Token expired or invalid" });
//     }
// }

app.get('/auth/check', middlCheckToken, (req, res) => {
    res.json(req.user)
})

app.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
});

app.post('/login', middleLogUser, async (req, res) => {
    try {
        const userFind = await UserModel.findOne({ email: req.body.email });
        if (!userFind) return res.status(400).json({ error: "User not found" });
        const isMatch = await bcrypt.compare(req.body.password, userFind.password);
        if (!isMatch) return res.status(400).json({ error: "Password error!" });
        const token = jwt.sign(
            { _id: userFind._id, email: req.body.email, firstName: userFind.firstName, secondName: userFind.secondName, phone: userFind.phone, status: userFind.status },
            secretKey,
            { expiresIn: "2h" }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 120 * 60 * 1000
        });
        return res.status(200).send('verefication completed')

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
    try {
        const userId = req.user._id;
        const userUpd = await UserModel.findOneAndUpdate({ _id: userId },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!userUpd) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(userUpd);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

app.patch('/change-password', middlCheckToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const { password, oldPassword } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Старий пароль невірний' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const userUpd = await UserModel.findOneAndUpdate({ _id: userId },
            { $set: { password: hashedPassword } },
            { new: true, runValidators: true });
        res.status(200).json({ msg: 'mabariLike' })
        if (!userUpd) return res.status(400).json({ msg: "User not found" });

    } catch (error) {
        res.status(500).json({ error: error.message });
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

    try {
        const userById = await UserModel.findById(req.params.id);
        res.json(userById);
    } catch (e) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

});

app.listen(PORT, () => {
    console.log(`server runing on ${PORT}`);
}).on('error', (err) => {
    console.error("Port with error:", err.message);
});