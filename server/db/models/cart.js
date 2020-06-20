const db = require('../db')
const Sequelize = require('sequelize')

const Cart = db.define('cart', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Cart.updateAmount = async function(userId, productId, amount) {
  await this.update(
    {amount: amount},
    {where: {userId: userId, productId: productId}}
  )
}

module.exports = Cart
//updateAmout(amount)
//this model as well has UserId
//Child of User
