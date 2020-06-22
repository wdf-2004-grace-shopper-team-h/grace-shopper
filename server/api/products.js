const router = require('express').Router()
const {green, red} = require('chalk')
const Products = require('../db/models/products')
const {OrderProducts, Orders} = require('../db/models/')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll()
    res.status(200).json(products)
    console.log(green('Fetch all products Success!'))
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
    console.log(green(`Fetch product with id: ${req.params.id} Success!`))
  } catch (error) {
    console.log(red(`Can't fetch product with id: ${req.params.id}`))
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    if (!req.session.admin) {
      console.log(red('ACCESS DENIED!'))
      res.sendStatus(403)
    }
    const destroyed = await Products.destroy({
      where: {
        id: req.params.id
      }
    })
    console.log(
      green(`Deleted ${destroyed.name} successfully from the database!`)
    )
    res.json(destroyed)
  } catch (error) {
    console.log(
      red(`Can't delete product with id: ${req.params.id} from the database.`)
    )
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if (!req.session.admin) {
      console.log(red('ACCESS DENIED!'))
      res.sendStatus(403)
    }
    const updated = await Products.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    console.log(green(`Updated ${updated.name} successfully in the database!`))
    res.json(updated)
  } catch (error) {
    console.log(
      red(`Can't delete product with id: ${req.params.id} from the database.`)
    )
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.session.admin) {
      console.log(red('ACCESS DENIED!'))
      res.sendStatus(403)
    }
    const created = await Products.create(req.body)
    console.log(green(`Created ${created.name} successfully in the database!`))
    res.json(created)
  } catch (error) {
    console.log(red(`Can't create ${req.body.name} in the database!`))
    next(error)
  }
})
