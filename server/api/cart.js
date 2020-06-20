const router = require('express').Router()
const {Op} = require('sequelize')
const {Products, User, OrderProducts, Orders} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const mostRecentOrder = await Orders.findOne({
      where: {
        userId: req.session.userId || 1,
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
      console.log(order.products)
    }
    twoDOrder(mostRecentOrder)

    res.status(200).json(mostRecentOrder)
  } catch (err) {
    next(err)
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
