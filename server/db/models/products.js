const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.INTEGER, //in penny
    defaultValue: 0
  },
  imgUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.countrystyle.com/wp-content/uploads/2016/09/SorryNoImageYet.png'
  },
  description: {
    type: Sequelize.TEXT
  }
})
