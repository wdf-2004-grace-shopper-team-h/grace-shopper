const db = require('../db')
const Sequelize = require('sequelize')
const OrderProducts = require('../models/orderProducts')
const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Order.prototype.getOrderProductQuantity = async function() {
  const orderProducts = await OrderProducts.findAll({
    where: {
      orderId: this.id
    }
  })
  return orderProducts
}

module.exports = Order
