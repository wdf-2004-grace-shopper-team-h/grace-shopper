const router = require('express').Router()
const {Products, Cart, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByPk({
      where: {
        id: req.session.userId
      }
    })
    const carts = user.carts

    res.status(200).json(user.carts)

    const cart = await Cart.findAll()
    res.status(200).json(cart)
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

router.delete('/removeItem', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.session.userId)
    const itemId = req.body.itemId
    const cart = user.carts
    carts.map()
  } catch (error) {
    next(error)
  }
})
