const router = require('express').Router()
const {Op} = require('sequelize')
const {Products, User, OrderProducts, Orders} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  if (req.session.userId) {
    try {
      const mostRecentOrder = await Orders.findOne({
        where: {
          userId: req.session.userId,
          isCompleted: false
        },
        include: {model: Products}
      })

      const twoDOrder = order => {
        //Make a util function
        order.products.map(
          product =>
            (product.dataValues.quantitySold =
              product.order_products.numberOfItems)
        )
      }
      twoDOrder(mostRecentOrder)

      res.status(200).json(mostRecentOrder)
    } catch (err) {
      next(err)
    }
  } else {
    try {
      const guestProducts = await Products.findAll({
        where: {
          id: {
            [Op.in]: req.query.productIds
          }
        }
      })
      res.json(guestProducts)
    } catch (error) {
      next(error)
    }
  }
})

router.post('/', async (req, res, next) => {
  try {
    const cart = await OrderProducts.create({
      orderId: req.session.orderId,
      productId: req.body.productId,
      numberOfItems: req.body.numberOfItems
    })
    res.json(cart) //for testing purposes. Should change to a res.status 201 when done
  } catch (error) {
    next(error)
  }
})

//get the order than typ add product through{update nom items} 2db calls
