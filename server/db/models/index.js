const User = require('./user')
const Products = require('./products')
//const Cart = require('./cart')
const Orders = require('./orders')
const OrderProducts = require('./orderProducts')

///User.hasMany(Cart)
//User.hasMany(Order)
//Order.hasMany(OrderDetails)

//Belongs to Many association with Options

Orders.belongsToMany(Products, {through: 'order_products'})
Products.belongsToMany(Orders, {through: 'order_products'})
User.hasMany(Orders)

// OrderProducts.belongsToMany(Orders)

// OrderProducts.belongsToMany(Products)
//Order.hasMany(Products,{as: 'order_products', numberOfItems: 0})

module.exports = {
  User,
  Products,
  Orders,
  OrderProducts
}
