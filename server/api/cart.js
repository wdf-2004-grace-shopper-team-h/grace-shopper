const router = require('express').Router()
const {Products, User, OrderProducts, Orders} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // const user = await User.findByPk({
    //   where: {
    //     id: req.session.userId
    //   }
    // })

    const currOrder = await OrderProducts.findAll({
      // gives us OrderId, ProductId, numofItems
      where: {
        userId: req.session.userId
      },
      order: [['createdAt', 'DESC']]
      //last orderId that also had userId
    })
    const productIds = currOrder.filter(ele => ele.productId)

    const subTotal = await Orders.findByPk(currOrder[0].orderId)

    const products = await Products.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: [...productIds]
        }
      }
    })
    /* products - imageUrl, name, price
      orderProducts - num of Items, orderId, productId 
      orders - total


      orderProducts = [{numItems, orderId, productId}]
      subTotal = [{priceTotal}] 
      products = []
    */

    // product.name, product.price, product.imgUrl, order.total

    const sendInfo = []

    res.status(200).json()
  } catch (err) {
    next(err)
  }
})
//if id doesnt match id in store send post request
//if does then put request
//find one where user Id's match and includes cart
//updateAmount (amount)
router.put('/updateAmount', async (req, res, next) => {
  try {
    const itemId = req.body.itemId
    const quantity = req.body.amount
    const user = await User.findByPk(req.session.userId)

    user.carts.map(product => {
      if (product.itemId === itemId) {
        product.quantity = quantity
      }
    })
    res.sendStatus(204)
    //res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.post('/addCart', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.session.userId)
    const itemId = req.body.itemId
    const amount = req.body.amount
    await user.createCart({itemId, amount})
  } catch (error) {
    next(error)
  }
})

// })
