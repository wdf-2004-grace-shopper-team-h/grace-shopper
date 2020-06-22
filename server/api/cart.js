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
    }
    twoDOrder(mostRecentOrder)

    //Pull order products table off the products we queried from the database and make it easier to access.
    // This method will create an array of objects that contain the order_products data and store it in a variable
    // let ordersToSend = mostRecentOrder.products
    //   .map(el => el.dataValues.order_products)
    //   .map(el => {
    //     //
    //     return {
    //       orderId: el.orderId,
    //       productId: el.productId,
    //       numberOfItems: el.numberOfItems,
    //       priceSold: el.priceSold,
    //       createdAt: el.createdAt
    //     }
    //   }) //O(n^2);

    // // reassign the variable to include the the product that corresponds to the productId from the data queried.
    // ordersToSend = ordersToSend.map(el => {
    //   return {
    //     ...el,
    //     product: mostRecentOrder.products.filter(
    //       element =>
    //         element.dataValues.id === el.productId
    //           ? {...element.dataValues}
    //           : null
    //     )[0].dataValues
    //   }
    // }) //O(n^2);

    res.status(200).json(mostRecentOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  console.log(req.session)
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
