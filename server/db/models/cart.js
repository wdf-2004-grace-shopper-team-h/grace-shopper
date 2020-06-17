const db = require('../db')
const Sequelize = require('sequelize')

module.exports = db.define('cart', {
  itemId: {
    type: Sequelize.INTEGER
  },
  amount: {
    type: Sequelize.INTEGER
  }
})
