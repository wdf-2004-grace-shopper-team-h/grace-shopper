const router = require('express').Router()
const Cart = require('../db/models/cart')
const User = require('../db/models/user')
module.exports = router
//
router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByPk({
      where: {
        id: req.session.userId
      }
    })
    const carts = user.carts
    res.status(200).json(user.carts)
  } catch (err) {
    next(err)
  }
})
//if id doesnt match id in store send post request
//if does then put request
//find one where user Id's match and includes cart
router.put('/updateAmount', async (req, res, next) => {
  try {
    const itemId = req.body.itemId
    const quantity = req.body.amount
    const user = await User.findByPk(req.session.userId)
    console.log(user.carts)
    res.json(user.carts)
    //res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.session.userId)
    const itemId = req.body.itemId

    await user.createCart({itemId, amount: 1})
  } catch (error) {
    next(error)
  }
})
