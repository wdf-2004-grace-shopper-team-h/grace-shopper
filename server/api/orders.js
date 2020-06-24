const router = require('express').Router()
const {Orders, Products} = require('../db/models')
const Order = require('../db/models/orders')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log(req.user.id)
    const orders = await Orders.findAll({
      where: {
        userId: req.user.id,
        isCompleted: true
      },
      order: [['id', 'DESC']]
    })

    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        id: req.params.id
      },
      include: {model: Products}
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})
