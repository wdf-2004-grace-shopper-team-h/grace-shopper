/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout} from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getItems', () => {
    it('eventually dispatches the GET ITEMS IN CART action', async () => {
      const fakeItems = [{itemId: 1, quantity: 3}, {itemId: 4, quantity: 3}]
      mockAxios.onGet('/api/cart').replyOnce(200, fakeItem)
      await store.dispatch(getItems())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ITEMS_IN_CART')
      expect(actions[0].item).to.be.deep.equal(fakeItems)
    })
  })

  xdescribe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_USER')
      expect(history.location.pathname).to.be.equal('/login')
    })
  })
})
