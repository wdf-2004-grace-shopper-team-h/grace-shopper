const SET_NUM_ITEMS = 'SET_NUM_ITEMS'

export const setNumItems = numberOfItems => ({
  type: SET_NUM_ITEMS,
  numberOfItems
})

const defaultNumOfItems = 1

export default (state = defaultNumOfItems, action) => {
  switch (action.type) {
    case SET_NUM_ITEMS:
      return action.numberOfItems
    default:
      return state
  }
}
