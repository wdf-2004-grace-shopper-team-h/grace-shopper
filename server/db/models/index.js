const User = require('./user')
const Products = require('./products')
const Cart = require('./cart')

Cart.belongsTo(User)

module.exports = {
  User,
  Products,
  Cart
}
