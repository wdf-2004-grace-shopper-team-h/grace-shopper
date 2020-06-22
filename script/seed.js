/* eslint-disable */
'use strict'

const db = require('../server/db')
const {Products, User, Cart} = require('../server/db/models')
const OrderProducts = require('../server/db/models/orderProducts')
const Orders = require('../server/db/models/orders')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // const cart = await Promise.all([Cart.create(
  //   Cart.create({itemId: 1, amount: 1})
  // )])

  const users = await Promise.all([

    User.create({email: 'cody1@email.com', password: '123',admin: true}),
    User.create({email: 'murphy1@email.com', password: '123'}),
    User.create({
      email: 'admin12@graceshopp.er',
      password: 'helloworld',
      isAdmin: true
    }),
    User.create({
      email: 'grouph@graceshopp.er',
      password: 'grouph123',
      isAdmin: true
    }),
    User.create({email: 'cody2@email.com', password: '123'}),
    User.create({email: 'murphy2@email.com', password: '123'}),
    User.create({email: 'cody3@email.com', password: '123'}),
    User.create({email: 'murphy3@email.com', password: '123'}),
    User.create({email: 'cody4@email.com', password: '123'}),
    User.create({email: 'murphy4@email.com', password: '123'}),
    User.create({email: 'cody5@email.com', password: '123'}),
    User.create({email: 'murphy5@email.com', password: '123'})

  ])

  const order1 = await Orders.create({
    userId: 1,
    total: 1998,
    isCompleted: true
  })

  const order2 = await Orders.create({
    userId: 2,
    total: 9993,
    isCompleted: true
  })
  const order3 = await Orders.create({
    userId: 2,
    total: 1998,
    isCompleted: false
  })
  const order4 = await Orders.create({
    userId: 1,
    total: 5000,
    isCompleted: false
  })

  // console.log(users[0].__proto__);

  const sorry = await Products.create({
    name: 'Sorry!',
    inventoryAmount: 20,
    price: 999,
    description: `Slide, collide and score to win the game of Sorry! Draw cards to see how far you get to move one of your pawns on the board. If you land on a Slide you can zip to the end and bump your opponents' pawns  or your own! Jump over pawns and hide in your Safety zone while getting powers with the 2 power-up tokens. Keep on moving and bumping until you get all three of your pawns from your color Start to your color Home. But watch out, because if you get bumped, Sorry! It's all the way back to Start!
      \nIncludes gameboard, 12 Sorry! Pawns, 44 cards, 2 power-up tokens and instructions.
      \nProduct Features:
      \n* Classic Sorry! game is mystery-solving guessing fun
      \n* Bump other players' pawns and hide in your Safety Zone, where pawns of other colors can't enter
      \n* Power-up tokens give you special powers
      \n Ages 6 and up.
      \n For 2 to 4 players.
      \n Sorry! and all related characters are trademarks of Hasbro.`,
    imgUrl:
      'https://www.hasbro.com/common/productimages/en_US/590E193450569047F59F9F4E9B948900/f3a2b73e4729327715e8178abd2699dcd50bbac9.jpg'
  })
  const monopoly = await Products.create({
    name: 'Monopoly',
    inventoryAmount: 0,
    price: 1999,
    description: `This version of the Monopoly game welcomes the Rubber Ducky, Tyrannosaurus Rex, and Penguin into its family of tokens. Choose your token, place it on GO! and roll the dice to own it all! There can be only one winner in the Monopoly game. Will it be you?

      \n* Includes gameboard, 8 Tokens, 28 Title Deed Cards, 16 Chance Cards, 16 Community Chest Cards, 32 Houses, 12 Hotels, 2 Dice, Money Pack and instructions.
      \n* Fast-dealing property trading game
      \n* Players buy, sell and trade properties to win
      \n* Build houses and hotels on properties
      \n* Change your fortune with Chance and Community Chest cards.
      \n* And bankrupt your opponents to win it all
      \n* Ages 8 and up
      \n* For 2-8 players`,
    imgUrl:
      'https://www.hasbro.com/common/productimages/en_US/7EABAF9750569047F5778F4663C79E75/885BBE6B65D1415A8C945214207F7678.jpg'
  })
  const taboo = await Products.create({
    name: 'Taboo',
    inventoryAmount: 20,
    price: 1499,
    description: `It's the exciting Taboo game that keeps players on the edge of their seats! Players try to get teammates to say the Guess word on the card without using any of the Taboo words in the clues. If the describer says a Taboo word listed on the card while giving the clues, they'll get interrupted with the electronic buzzer and lose a turn. Players keep the cards that were guessed correctly, and the team with the most cards wins the game. With 400 double-sided cards in this Taboo game, players will have plenty of words to choose from as they race against the clock to give teammates the best descriptions and clues possible.

      \n* Includes 400 cards, buzzer, timer, and instructions.

      \n* Get your team to say the Guess word without saying the Taboo words
      \n* Oops! Say a Taboo word and get the buzzer
      \n* Race against the timer
      \n* Fun and fast-paced party game

      \n* Ages 13 and up
      \n* For 4 or more players.
      \n* Requires 2 x 1.5V AAA alkaline batteries. (batteries not included.)`,
    imgUrl: `https://www.hasbro.com/common/productimages/en_US/84edd93150569047f5e581401d4d8865/435cef1703a70482ac0bd938671b6e72f79f7fd1.jpg`
  })
  const unoTin = await Products.create({
    name: 'Uno Tin',
    inventoryAmount: 20,
    price: 999,
    description: `​UNO™ is the classic family card game that's easy to pick up and impossible to put down! Players take turns matching a card in their hand with the current card shown on top of the deck either by color or number. Special action cards, like Skips, Reverses, Draw Twos, color-changing Wild and Draw Four Wild cards, deliver game-changing moments as they each perform a function to help you defeat your opponents. If you can't make a match, you must draw from the center pile. And when you're down to one card, don't forget to shout "UNO!" The first player to get rid of all the cards in their hand wins. Now card game-lovers can get UNO™ in a sturdy tin that's great for travel and makes storage stress-free. Colors and decorations may vary.

      ​\nUNO™ is the classic family card game that's easy to learn and so much fun to play!
      \n*​In a race to deplete your hand, match one of your cards with the current card shown on top of the deck by either color or number.
      \n*​Strategize to defeat your competition with special action cards like Skips, Reverses, Draw Twos and color-changing Wild cards.
      ​\n*When you're down to one card, don't forget to shout "UNO!"
      \n* ​This fun family card game is perfect for adults, teens and kids 7 years old and up.
  `,
    imgUrl: `https://www.mattelgames.com/games/sites/mattel_games/files/2018-03/42003_PIP_16_001_0.jpg`
  })
  const mouseTrap = await Products.create({
    name: 'Mouse Trap',
    inventoryAmount: 20,
    price: 1999,
    description: `The Mouse Trap game, a longtime family favorite, is always good for zany action and lots of laughs. Scurry around the board collecting cheese and stealing cheese from other players&but watch out for the trap! While kids are engaged in playing the Mouse Trap game, they can also practice valuable skills in construction, cause and effect, and decision-making. As they interact with the trap, a working, multi-part machine, kids can practice construction skills. They can also work on understanding cause and effect as they understand that each action causes a reaction. And players can practice decision making as they analyze the situation and determine the next best step. Most importantly, kids can have so much fun playing this wacky game!

      \nInclude gameboard, 4 mouse pawns, marble, 24 Mouse Trap contraption parts, rubber band, 24 cardboard cheese wedges, die, and instructions.

      \n* Reviewed by MENSA for Kids
      \n* Practice valuable skills in construction, cause and effect, and decision-making
      \n* The classic game of mouse-catchin' action
      \n* From the makers of the Cranium game
      \n
      \n* Ages 6 and up
      \n* Choking Hazard -- Game contains a marble. Not for children under 3 years.
      \n* Adult assembly required.
      \n* For 2 to 4 players.`,
    imgUrl: `https://www.hasbro.com/common/productimages/en_US/7ea5414950569047f5a233f4578345cc/7EA77B3150569047F54E3350FA98227B.jpg`
  })
  const orderProducts = await Promise.all([
    OrderProducts.create({
      orderId: order1.id,
      productId: sorry.id,
      numberOfItems: 2,
      priceSold: 999
    }),
    OrderProducts.create({
      orderId: order4.id,
      productId: sorry.id,
      numberOfItems: 3,
      priceSold: 999
    }),
    OrderProducts.create({
      orderId: order4.id,
      productId: monopoly.id,
      numberOfItems: 2,
      priceSold: 1999
    }),
    OrderProducts.create({
      orderId: order4.id,
      productId: taboo.id,
      numberOfItems: 2,
      priceSold: 1499
    }),
    OrderProducts.create({
      orderId: order3.id,
      productId: sorry.id,
      numberOfItems: 2,
      priceSold: 999
    }),
    OrderProducts.create({
      orderId: order2.id,
      productId: unoTin.id,
      numberOfItems: 1,
      priceSold: 999
    })
  ])

  // await User.findByPk(1)
  //   .then(user => user.createOrder())
  //   .then(order =>
  //     order.createOrderDetail({productId: 2, quantity: 3, total_cost: 300})
  //   )

  // await users[0].createCart({productId: 4, amount: 1})
  // await users[0].createCart({productId: 1, amount: 3})

  // //checking update in Cart model
  // await Cart.updateAmount(1, 4, 10)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
