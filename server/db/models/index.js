const User = require('./user')
const Products = require('./products')
const Cart = require('./cart')

User.hasMany(Cart)
// Cart.belongsTo(User)

module.exports = {
  User,
  Products,
  Cart
}
