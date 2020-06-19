const router = require('express').Router()
const {Products, User, OrderProducts, Orders} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // find incompleted order for cart
    // if it doesn't exist we're going to create a new order instance
    const mostRecentOrder = await Orders.findOne({
      where: {
        userId: req.session.userId,
        completed: false
      }
    })

    //else find orderId
    const orderId = mostRecentOrder.id
    //then find all order_products
    const currOrder = await OrderProducts.findAll({
      where: {
        orderId: orderId
      },
      order: [['createdAt', 'DESC']]
    })
    //get productIds from order_products to get product info
    const productIds = currOrder.filter(ele => ele.productId)
    //get products thru productIds
    const products = await Products.findAll({
      include: {
        model: OrderProducts,
        where: {
          id: {
            [Sequelize.Op.in]: [...productIds]
          }
        }
      }
    })

    //now we have
    /* 
      orderProducts - [{num of Items, productId}]
      products = [{imageUrl, name, price, productId}]
    */
    //
    // product.name, product.price, product.imgUrl

    let sendProducts = []

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
