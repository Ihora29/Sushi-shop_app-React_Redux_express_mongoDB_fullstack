import Joi from 'joi';


export const schemaValidReg = Joi.object({
    firstName: Joi.string().trim().min(2).max(20),
    secondName: Joi.string().trim().min(2).max(20),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    status: Joi.string().valid('login-user', 'admin-user').default('login-user'),
    phone: Joi.string()
})

export const schemaValidLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

