const User = require('./user')
const Products = require('./products')
const Cart = require('./cart')
const Order = require('./order')
const OrderDetails = require('./orderDetails')

User.hasMany(Cart)
User.hasMany(Order)
Order.hasMany(OrderDetails)
Products.hasMany(Cart)
Products.hasMany(Order)
OrderDetails.belongsTo(Products)

module.exports = {
  User,
  Products,
  Cart,
  Order,
  OrderDetails
}
