import React, {createRef, SyntheticEvent, useEffect, useRef, useState} from 'react';
import CartItem from "./CartItem";
import {CartType} from "../../graphql/cart";
import {useRecoilState} from "recoil";
import {checkedCartState} from "../../recoil/cart";
import WillPay from "../../component/cart/willPay";

function CartList({items}: { items: CartType[] }) {
    const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);
    const formRef = useRef<HTMLFormElement>(null);
    const checkboxRefs = items.map(() => createRef<HTMLInputElement>());
    const [formData, setFormData]  = useState<FormData>(null);

    const setAllCheckedFromItems = () => {
        // 개별 아이템 선택
        if (!formRef.current) return;
        const data = new FormData(formRef.current);
        const selectedCount = data.getAll('select-item').length;
        formRef.current.querySelector<HTMLInputElement>('.select-all').checked = (selectedCount === items.length);

    }

    const setItemsCheckFromAll = (targetInput: HTMLInputElement) => {
        const allChecked = targetInput.checked;
        checkboxRefs.forEach(inputElem => {
            inputElem.current!.checked = allChecked
        })
    }

    const handleCheckboxChanged = (e?:SyntheticEvent) => {
        if (!formRef.current) return;
        const targetInput = e?.target as HTMLInputElement;
        if (targetInput && targetInput.classList.contains('select-all')) {
            setItemsCheckFromAll(targetInput)
        } else {
            setAllCheckedFromItems();
        }
        const data = new FormData(formRef.current);
        setFormData(data);
    };

    useEffect(() => {
        checkedCartData.forEach(item => {
            const itemRef  = checkboxRefs.find(ref => ref.current!.dataset.id === item.id)
            if (itemRef) {
                itemRef.current!.checked = true;
            }
        })
        setAllCheckedFromItems();

    },[])

    useEffect(() => {
        const checkedItems =  checkboxRefs.reduce<CartType[]>((res, ref, i) => {
            if (ref.current!.checked) {
                res.push(items[i])
            }
            return res;
        },[]);
        setCheckedCartData(checkedItems)
    },[items, formData]);




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
