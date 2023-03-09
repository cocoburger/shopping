import {checkedCartState} from "../../recoil/cart";
import {useRecoilValue} from "recoil";
import {useNavigate} from 'react-router-dom';
import '../../scss/willPay.css';
import ItemData from "./ItemData";

const willPay = () => {
  const navigate = useNavigate();
  const checkedItems = useRecoilValue(checkedCartState);
  const totalPrice = checkedItems.reduce((res, {price, amount}) => {
    res += price * amount;
    return res
  }, 0);

  const handleSumbit = () => {
    if (checkedItems.length) {
      navigate('/payment');
    }else {
      alert('결제할 상품이 없습니다.')
    }
  }

  return (
      <div className="wrapper">
        <ul className="cards_wrap">
          {checkedItems.map(({imageUrl, price, title, amount, id}) => (
              <li className="card_item" key={id + title} >
                <ItemData imageUrl={imageUrl} price={price} title={title} key={id} />
                <p className="role_name">수량 : {amount}</p>
                <p className="real_name">금액 : {price * amount}</p>
              </li>
          ))}
        </ul>
        <p className='total__price'>총액예상 결제액 : {totalPrice}원 </p>
        <button onClick={handleSumbit} >결제하기</button>
      </div>
)
}
export default willPay


