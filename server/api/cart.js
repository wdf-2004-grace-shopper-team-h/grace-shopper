const router = require('express').Router
const Cart = require('../db/models/cart')
router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.id
      }
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})
module.exports = router
