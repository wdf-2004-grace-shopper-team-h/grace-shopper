const db = require('../db')
const Orders = require('./orders')
const Products = require('./products')
const Sequelize = require('sequelize')

module.exports = db.define('order_products', {
  orderId: {
    type: Sequelize.INTEGER,
    references: {
      model: Orders,
      key: 'id'
    }
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Products,
      key: 'id'
    }
  },
  numberOfItems: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  priceSold: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
}) // 1, [1,2,3,4] , [2,1,2,1]
