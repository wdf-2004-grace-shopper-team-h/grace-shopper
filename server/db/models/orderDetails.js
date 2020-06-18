const db = require('../db')
const Sequelize = require('sequelize')

module.exports = db.define('orderDetails', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  total_cost: {
    type: Sequelize.FLOAT
  }
})
