const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const OrderProducts = db.model('order_products')
const Orders = db.model('order')
const Products = db.model('products')
const User = db.model('user')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart', () => {
    beforeEach(async () => {
      const chess = await Products.create({
        name: 'chess',
        amount: 20,
        price: 2500,
        description: 'lorem ipsum something something something'
      })
      const explodingKittens = await Products.create({
        name: 'Exploding Kittens',
        amount: 20,
        price: 1500,
        description: 'some kittens explode and stuff',
        imageUrl:
          'https://www.explodingkittens.com/img/store/games/original_edition.png'
      })

      const user = await User.create({email: 'cody123@email.com'})
      const order1 = await Orders.create({
        userId: user.id,
        total: 4000,
        isCompleted: true
      })
      const order2 = await Orders.create({
        userId: user.id,
        total: 5500,
        isCompleted: false
      })
      const orderProducts1 = await OrderProducts.create({
        orderId: order2.id,
        productId: chess.id,
        numberOfItems: 1,
        priceSold: 2500
      })
      const orderProducts2 = await OrderProducts.create({
        orderId: order2.id,
        productId: explodingKittens.id,
        numberOfItems: 2,
        priceSold: 1500
      })
    })
    it('GET /api/cart', async () => {
      const res = await request(app)
        .get('/api/cart')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.products[0].quantitySold).to.be.equal(1)
    })
  })
})
