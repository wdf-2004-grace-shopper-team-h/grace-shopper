const db = require('../db')
const Sequelize = require('sequelize')

module.exports = db.define('order', {
  orderDate: {
    type: Sequelize.TIME
  }
})
//this model as well has UserId
//Child of User
//has method addOrderDetails
