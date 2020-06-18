const db = require('../db')
const Sequelize = require('sequelize')

module.exports = db.define('cart', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

//updateAmout(amount)
//this model as well has UserId
//Child of User
