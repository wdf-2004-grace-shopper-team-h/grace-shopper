const router = require('express').Router()
const {green, red} = require('chalk')
const {OrderProducts, Orders, Products} = require('../db/models/')
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

router.post('/create_new_product', async (req, res, next) => {
  try {
    console.log(req.body)
    await Products.create(req.body).then(product => res.json(product))
    //  console.log(green(`Created ${created.name} successfully in the database!`))
  } catch (error) {
    console.log(red(`Can't create ${req.body.name} in the database!`))
    next(error)
  }
})
