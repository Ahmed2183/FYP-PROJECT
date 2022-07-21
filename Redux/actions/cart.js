import {AddToCart, DeleteFromCard} from './types';

export const addtocart =  (product) => (
    {
        type: AddToCart,
        product: product
    }
)

export const deletefromcart  =  (id) => (
    {
        type: DeleteFromCard,
        id : id
    }
) 
