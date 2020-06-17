const router = require('express').Router()
const Cart = require('../db/models/cart')
const User = require('../db/models/user')
module.exports = router
//
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk({
      where: {}
    })
    res.status(200).json(cart)
  } catch (err) {
    next(err)
  }
})
//find one where user Id's match and includes cart
router.put('/addItemToCart', async (req, res, next) => {
  try {
    //we want to use user[id].createCart{itemId: id, amount: amount}
    // we want to search the cart for the userId === userId & itemId === itemId
    // then amount: amount+=amount
    // const cart = await Cart.findOne({
    //   where: {
    //     userId: req.session.userId // req.body.userId?
    //   }
    // })
    const itemId = req.body.itemId
    const quantity = req.body.itemId.quantity
    if (!cart.itemId) {
      cart.push({
        itemId: {
          quantity: quantity
        }
      })
    } else {
      cart.itemId.quantity += quantity
    }

    res.json(cart)
    //res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

// router.post('/', async (req, res, next){

// })
