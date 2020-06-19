const router = require('express').Router()
const {Op} = require('sequelize')
const {Products, User, OrderProducts, Orders} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // find incompleted order for cart
    // if it doesn't exist we're going to create a new order instance
    const mostRecentOrder = await Orders.findOne({
      where: {
        userId: 1,
        isCompleted: false
      }
    })

    const orderProducts = await mostRecentOrder.getOrderProductQuantity()
    // //else find orderId
    const orderId = mostRecentOrder.id
    // console.log('-----------------',products, '------------------', orderProducts)

    // //then find all order_products
    const products = await mostRecentOrder.getProducts()
    console.log(
      '-----------------',
      products,
      '------------------',
      orderProducts
    )

    // function orderDetails (products, orderProducts){
    //     //[...{'taboo', imgurl, productId:3}]   orderProducts [...{productId: 3,quantity:3} ]
    //     const orderProduct.map(ele => ele.numberOfItems)
    //  {orderId: orderId, products: [], }
    //   return objectToSend
    // }

    //now we have
    /* 
      orderProducts - [{num of Items, productId, orderId}]
      products = [{imageUrl, name, price, productId}] 
    */
    //
    // product.name, product.price, product.imgUrl

    let sendProducts = []

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
