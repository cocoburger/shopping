import React, {createRef, SyntheticEvent, useRef} from 'react';
import CartItem from "./CartItem";
import {CartType} from "../../graphql/cart";
import {useSetRecoilState} from "recoil";
import {checkedCartState} from "../../recoil/cart";
import WillPay from "../../component/cart/willPay";

function CartList({items}: { items: CartType[] }) {
    const setCheckedCartData = useSetRecoilState(checkedCartState)
    const formRef = useRef<HTMLFormElement>(null);
    const checkboxRefs = items.map(() => createRef<HTMLInputElement>());


    const handleCheckboxChanged = (e:SyntheticEvent) => {
        if (!formRef.current) return;
        const targetInput = e.target as HTMLInputElement;
        const data = new FormData(formRef.current);
        const selectedCount = data.getAll('select-item').length;
        if (targetInput.name === 'select-all') {
            // all-check
            const allChecked = targetInput.checked;
            checkboxRefs.forEach(inputElem => {
                inputElem.current!.checked = allChecked
            })
        } else {
            // each item
            formRef.current.querySelector<HTMLInputElement>('.select-all').checked = (selectedCount === items.length);
        }

        const checkedItems =  checkboxRefs.reduce<CartType[]>((res, ref, i) => {
            if (ref.current!.checked) {
                res.push(items[i])
            }
            return res;
        },[])
        setCheckedCartData(checkedItems as CartType[])
    };
    return (
        <div>
            <form ref={formRef} onChange={handleCheckboxChanged}>
                <label>
                    <input className='select-all' name='select-all' type='checkbox'/>
                    전체선택
                </label>
                <ul>
                    {items.map((item,idx) => <CartItem {...item} key={item.id} ref={checkboxRefs[idx]}/>)}
                </ul>
            </form>
            <WillPay />
        </div>
    );
}

export default CartList;
