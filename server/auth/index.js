const router = require('express').Router()
const {User, Orders} = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {email: req.body.email},
      include: {model: Orders}
    })

    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.session.admin = user.admin
      const orders = user.orders
      const id = user.id
      if (orders.length) {
        //Will append order Id to the session for use later in application.
        const lastOrder = user.orders[user.orders.length - 1]
        if (lastOrder.dataValues.isCompleted) {
          const newOrder = await Orders.create({userId: id})
          req.session.orderId = newOrder.id
        } else {
          req.session.orderId = lastOrder.id
        }
      }
      req.session.userId = user.id
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  //localStorage cart data may be used here.
  try {
    const user = await User.create(req.body)
    const currentOrder = await Orders.create({userId: user.id})
    req.session.userId = user.id
    req.session.orderId = currentOrder.id
    console.log(currentOrder)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
