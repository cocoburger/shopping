import React, {createRef, SyntheticEvent, useRef} from 'react';
import CartItem from "./CartItem";
import {CartType} from "../../graphql/cart";

function CartList({items}: { items: CartType[] }) {
    const formRef = useRef<HTMLFormElement>(null);
    const checkboxRefs = items.map(() => createRef<HTMLInputElement>());
    const handleCheckboxChanged = (e:SyntheticEvent) => {
        if (!formRef.current) return;
        const checkboxs = formRef.current.querySelectorAll('.cart-item__checkbox');
        const targetInput = e.target as HTMLInputElement;
        const data = new FormData(formRef.current);
        const selectedCount = data.getAll('select-item').length;
        if (targetInput.name === 'select-all') {
            // all-check
            const allChecked = targetInput.checked;
            checkboxs.forEach(inputElem => {
                inputElem.checked = allChecked
            })
        } else {
            // each item
            formRef.current.querySelector<HTMLInputElement>('.select-all').checked = (selectedCount === items.length);
        }
    };
    return (
        <form ref={formRef} onChange={handleCheckboxChanged}>
            <label>
                <input className='select-all' name='select-all' type='checkbox'/>
                전체삭제
            </label>
            <ul>
                {items.map(item => <CartItem {...item} key={item.id} ref={checkboxRefs[i]}/>)}
            </ul>
        </form>
    );
}

export default CartList;
