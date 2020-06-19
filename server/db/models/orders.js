const db = require('../db')
const Sequelize = require('sequelize')

module.exports = db.define('order', {
  userId: {
    //posibly add a join table for user id
    type: Sequelize.INTEGER,
    allowNull: false
  },
  priceTotal: {
    type: Sequelize.INTEGER
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
  // orderDate: {
  //   type: Sequelize.TIME
  // }
})
//this model as well has UserId
//Child of User
//has method addOrderDetails
