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
