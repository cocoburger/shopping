import React from 'react';
import {useQuery} from "react-query";
import {graphqlFetcher, QueryKeys} from "../../queryClient";
import {useParams} from "react-router-dom";
import ProductDetail from "../../component/product/detail";
import {GET_PRODUCT, Product} from "../../graphql/products";

function ProductDetailPage() {
    const {id} = useParams();
    const {data} = useQuery<Product>([QueryKeys.PRODUCTS, id],
        () =>
            graphqlFetcher(GET_PRODUCT, {id}),
    )

    console.log(data);

    if (!data) return null;

    return (
        <div>
            <h2>상품상세</h2>
            <ProductDetail item={data} />
        </div>
    );
}

export default ProductDetailPage;
