const router = require('express').Router()
const {green, red} = require('chalk')
const Products = require('../db/models/products')
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

app.get('/:id', async (req, res, next) => {
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
