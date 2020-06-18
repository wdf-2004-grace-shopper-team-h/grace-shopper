const User = require('./user')
const Products = require('./products')
const Cart = require('./cart')
const Order = require('./order')
const OrderDetails = require('./orderDetails')

User.hasMany(Cart)
User.hasMany(Order)
Order.hasMany(OrderDetails)

module.exports = {
  User,
  Products,
  Cart,
  Order,
  OrderDetails
}
