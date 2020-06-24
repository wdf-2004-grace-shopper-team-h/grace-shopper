const router = require('express').Router()
const {Orders, Products} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
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
    const singleOrder = await Orders.findOne({
      where: {
        userId: req.user.id,
        id: req.params.id
      },
      include: {model: Products}
    })
    res.json(singleOrder)
  } catch (error) {
    next(error)
  }
})
