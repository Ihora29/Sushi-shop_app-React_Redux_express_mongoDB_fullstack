
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    details: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    imgSrc: { type: String, required: true },
    totalCount: { type: Number, required: true },
}, { timestamps: true });


const userSchema = new mongoose.Schema({
    id: { type: String },
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true },
    phone: { type: String, required: true }
});

const orderItemModel = new mongoose.Schema({
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    imgSrc: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    option: { type: String },
    totalCount: { type: Number, required: true },
})


const ordersUserModel = new mongoose.Schema({
    name: { type: String, required: true },

    phone: { type: String, required: true },
    orders: [orderItemModel],
    totalPrice: { type: Number, required: true }
});

const OrdersUserModel = mongoose.model('user-ordersDB', ordersUserModel, 'user-ordersDB');

const ProductModel = mongoose.model('productsDB', productSchema, 'productsDB');

const UserModel = mongoose.model('usersDB', userSchema, 'usersDB')

module.exports = { ProductModel, UserModel, OrdersUserModel };