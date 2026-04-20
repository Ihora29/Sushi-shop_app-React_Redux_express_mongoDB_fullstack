
import { schemaValidLogin } from "../schemaValidate/schemas.js";

export const middleLogUser = async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        // console.log("без боді");
        return res.status(401).json({ message: 'user Unauthorized' })

    }
    const { error, value } = schemaValidLogin.validate(req.body, { abortEarly: false });

    if (error) {
        console.log('error in valid');
        return res.status(400).send(error.message)
    }
    next()
}