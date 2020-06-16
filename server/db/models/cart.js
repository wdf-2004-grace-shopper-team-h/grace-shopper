const db = require('../db')
const Sequelize = require('sequelize')

module.exports = db.define('cart', {
  products: {
    type: Sequelize.ARRAY,
    defaultValue: []
  }
})
