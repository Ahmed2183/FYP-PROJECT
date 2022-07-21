import {AddToCart, DeleteFromCard} from '../actions/types';

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case AddToCart:
      return {
        ...state,
        cart: state.cart.concat(action.product),
      };
      
    case DeleteFromCard:
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.id),
      };
    default:
      return state;
  }
};

export default cartReducer;
