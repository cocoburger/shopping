import {useQuery} from "react-query";
import {graphqlFetcher, QueryKeys} from "../../queryClient";
import GET_CART, {CartType} from "../../graphql/cart";
import CartList from "./CartList";

const Cart = () => {
    const {data} = useQuery(QueryKeys.CART, () => graphqlFetcher(GET_CART), {
        staleTime: 0,
        cacheTime:  1000,
    })
    const cartItems = Object.values(data || {}) as CartType[]
    console.log(cartItems);

    if (!cartItems.length) return <div>장바구니가 비워있어요</div>

    return (
       <CartList items={cartItems}/>
    )
}



export default Cart;
