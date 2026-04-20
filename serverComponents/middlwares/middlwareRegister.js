import { schemaValidReg } from "../schemaValidate/schemas.js";
import { UserModel } from "../dataModelSchema/schemaModel.js";
import bcrypt from "bcryptjs";

export const middlRegUser = async (req, res, next) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        // console.log("без боді");
        return res.status(400).json({ message: 'bad request' })

    }
    const { error, value } = schemaValidReg.validate(req.body, { abortEarly: false });
    if (error) {
        console.log('error in valid');
        return res.status(400).send(error.message)
    }
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
