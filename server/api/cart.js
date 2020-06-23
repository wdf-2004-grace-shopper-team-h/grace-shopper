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

//if id doesnt match id in store send post request
//if does then put request
//find one where user Id's match and includes cart
//updateAmount (amount)
// router.put('/updateAmount', async (req, res, next) => {
//   try {
//     const itemId = req.body.itemId
//     const quantity = req.body.amount
//     const user = await User.findByPk(req.session.userId)

//     user.carts.map(product => {
//       if (product.itemId === itemId) {
//         product.quantity = quantity
//       }
//     })
//     res.sendStatus(204)
//     //res.sendStatus(200)
//   } catch (error) {
//     next(error)
//   }
// })

// router.post('/addCart', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.session.userId)
//     const itemId = req.body.itemId
//     const amount = req.body.amount
//     await user.createCart({itemId, amount})
//   } catch (error) {
//     next(error)
//   }
// })

// // })
