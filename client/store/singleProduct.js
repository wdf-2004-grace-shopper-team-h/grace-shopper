const store = require('./index.js')

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

const getSingleProduct = id => ({
    type: GET_SINGLE_PRODUCT,
    id
})

export default (state = {}, action) => {
    switch(action.type) {
        case GET_SINGLE_PRODUCT:
            const products = store.getState().products
            let  product = {}
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === action.id) {
                    product = products[i]
                    break
                }
            }
            return product
        default: return state
    }
}