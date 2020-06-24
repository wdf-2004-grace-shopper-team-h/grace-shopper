const User = require('./user')
const Products = require('./products')
//const Cart = require('./cart')
const Orders = require('./orders')
const OrderProducts = require('./orderProducts')

Orders.belongsToMany(Products, {through: OrderProducts})
Products.belongsToMany(Orders, {through: OrderProducts})
User.hasMany(Orders)

module.exports = {
  User,
  Products,
  Orders,
  OrderProducts
}
