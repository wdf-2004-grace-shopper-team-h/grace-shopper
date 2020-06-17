const router = require('express').Router()
const Cart = require('../db/models/cart')
const User = require('../db/models/user')
module.exports = router

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
    const cart = await Cart.findOne({
      where: {
        userId: req.session.userId // req.body.userId?
      }
    })
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
router.put('/updateQuantity', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.session.userId //req.body.userId?
      }
    })
    const itemId = req.body.itemId
    const quantity = req.body.itemId.quantity

    itemId.quantity = quantity

    res.json(cart)
  } catch (error) {
    next(error)
  }
})
router.delete('/removeItemFromCart', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.session.userId //req.body.userId?
      }
    })
    const itemId = req.body.itemId

    delete cart.itemId

    res.json(cart)
  } catch (error) {
    next(error)
  }
})

//ask for users cart
//add item id
