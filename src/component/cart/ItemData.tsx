import React from "react";
import {CartType} from "../../graphql/cart";
import '../../scss/willPay.css';

const ItemData = ({imageUrl, price, title}:Pick<CartType, 'imageUrl' | 'price'| 'title'>) => {
  return (
   <>
     <img className=".cart-item__image" src={imageUrl}/>
     <p className='cart-item__price'>가격 : {price}</p>
     <p className='cart-item__title'>상품명 : {title}</p>
   </>
  )
}

export default ItemData
