const db = require('../db')
const Sequelize = require('sequelize')
const OrderProducts = require('../models/orderProducts')
const Order = db.define('order', {
  userId: {
    //posibly add a join table for user id
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

  // orderDate: {
  //   type: Sequelize.TIME
  // }
})

Order.prototype.getOrderProductQuantity = async function() {
  const orderProducts = await OrderProducts.findAll({
    where: {
      orderId: this.id
    }
  })
  return orderProducts
}
//this model as well has UserId
//Child of User
//has method addOrderDetails
module.exports = Order
