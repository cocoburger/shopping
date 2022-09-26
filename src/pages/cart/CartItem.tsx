import React, {SyntheticEvent} from 'react';
import {CartType, UPDATE_CART} from "../../graphql/cart";
import {useMutation} from "react-query";
import {graphqlFetcher} from "../../queryClient";

function CartItem( {id, imageUrl, price, title, amount} : CartType) {
    const { mutate: updateCart } = useMutation(({id, amount}: {id: string, amount:number}) =>
        graphqlFetcher(UPDATE_CART, {id, amount}),
    )

    const handleUpdateAmount = (e: SyntheticEvent) => {
        const amount = Number((e.target as HTMLInputElement).value)
        updateCart({id, amount})
    }
    return (
        <li>
            <img src={imageUrl} />
            <p className='cart-item__price'>{price}</p>
            <p className='cart-item__title'>{title}</p>
            <p className='cart-item__price'>{title}</p>
            <input type='number' className='cart-item__amount' value={amount} onChange={handleUpdateAmount}/>
        </li>
    );
}

export default CartItem;
