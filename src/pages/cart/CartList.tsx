import React from 'react';
import CartItem from "./CartItem";
import {UPDATE_CART, CartType} from "../../graphql/cart";
import {useMutation} from "react-query";
import {graphqlFetcher} from "../../queryClient";

function CartList( {items} : {items: CartType[]}) {

    return (
        <ul>
            {items.map(item => <CartItem {...item} key={item.id} />)}
        </ul>
    );
}

export default CartList;
