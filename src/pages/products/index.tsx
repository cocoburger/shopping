import React from 'react';
import {useQuery} from "react-query";
import {QueryKeys, graphqlFetcher} from "../../queryClient";
import ProductItem from "../../component/product/item";
import GET_PRODUCTS, { Products} from "../../graphql/products";


function ProductList() {
    const {data} = useQuery<Products>(QueryKeys.PRODUCTS, () => graphqlFetcher(GET_PRODUCTS))
    /**
     * 감자먹기
     */
    const hanlde = () => {

    }
    return (
        <div>
            <h2>상품 목록</h2>
            <ul className='product'>
                {data?.products?.map(product => (
                    <ProductItem {...product} key={product.id} />
                ))}
            </ul>
        </div>
    );
}

export default ProductList;


