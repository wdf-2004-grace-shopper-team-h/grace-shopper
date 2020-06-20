const db = require('../db')
const Sequelize = require('sequelize')

module.exports = db.define('orderDetails', {
  quantity: {
    type: Sequelize.INTEGER
  },
  total_cost: {
    type: Sequelize.INTEGER
  }
})
