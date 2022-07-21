import {combineReducers, createStore} from 'redux';
import cartReducer from '../reducer/CartReducer';


const rootReducer = combineReducers({
    cartReducer: cartReducer
})

const configureStore = () => createStore(rootReducer)

export default configureStore;