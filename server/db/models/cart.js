const db = require('../db')
const Sequelize = require('sequelize')

module.exports = db.define('cart', {
  amount: {
    type: Sequelize.INTEGER
  }
})

//updateAmout(amount)
//this model as well has UserId
//Child of User
