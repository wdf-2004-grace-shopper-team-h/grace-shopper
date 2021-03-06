const router = require('express').Router()
const {green, red} = require('chalk')
const {OrderProducts, Orders, Products} = require('../db/models/')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll()
    res.status(200).json(products)
  } catch (err) {
    console.log(red("Can't fetch all products. "), err)
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Products.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(product)
  } catch (error) {
    console.log(red(`Can't fetch product with id: ${req.params.id}`))
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  if (req.session.admin) {
    try {
      const destroyed = await Products.destroy({
        where: {
          id: req.params.id
        }
      })
      res.json(destroyed)
    } catch (error) {
      console.log(
        red(`Can't delete product with id: ${req.params.id} from the database.`)
      )
      next(error)
    }
  } else {
    console.log(red('Access denied'))
    res.sendStatus(500)
  }
})

router.put('/:id', async (req, res, next) => {
  if (req.session.admin) {
    try {
      const updated = await Products.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      res.json(updated)
    } catch (error) {
      console.log(
        red(`Can't delete product with id: ${req.params.id} from the database.`)
      )
      next(error)
    }
  } else {
    console.log(red('Access denied'))
    res.sendStatus(500)
  }
})

router.post('/', async (req, res, next) => {
  if (req.session.admin) {
    try {
      await Products.create(req.body).then(product =>
        res.json(product.dataValues.id)
      )
    } catch (error) {
      console.log(red(`Can't create ${req.body.name} in the database!`))
      next(error)
    }
  } else {
    console.log(red('Access denied'))
    res.sendStatus(500)
  }
})
