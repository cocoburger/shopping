import {forwardRef} from "react";
import {checkedCartState} from "../../recoil/cart";
import {useRecoilValue} from "recoil";
import ItemData from "./ItemData";

const willPay = () => {
  const checkedItems = useRecoilValue(checkedCartState)
  return (
    <div>
      {checkedItems.map(({imageUrl,price,title,id }) => <ItemData imageUrl={imageUrl} price={price} title={title} key={id} />)}
    </div>
  )
}
export default forwardRef(willPay)
