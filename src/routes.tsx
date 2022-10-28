
import GlobalLayout from './pages/_layout'
import Index from './pages/index'
import ProductsId from './pages/products/[id]'
import ProductDetail from "./pages/products/[id]";
import MainPage from "./pages/index";
import ProductList from "./pages/products";
import Cart from "./pages/cart";

// 안쪽에 routes를 살펴보면 배열 안 객체로 담겨있다. 그리고 path, element, children 요소가 있다.
// 여기서 Outlet이라는 것이 나온다.
//
// outlet
// An should be used in parent route elements to render their child route elements.
// This allows nested UI to show up when child routes are rendered. If the parent route matched exactly,
// it will render a child index route or nothing if there is no index route.
//
//     부모경로에서 자식경로를 렌더링하기 위해서 사용되어지는 것이고, 이것을 사용했을 때 하위 경로가 렌더링시 중첩된 ui를 표현할 수 있다. 부모경로가 정확하게 일치해야라고 한다.
//
//     나의경우 GlobalLayout이 이 outlet의 역할을 하는 페이지다.
export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <Index />, index: true},
      { path: '/products', element: <ProductList />, index: true},
      { path: '/products/:id', element: <ProductsId />, },
      { path: '/cart', element: <Cart />, index: true},
    ]
  }
]

export const pages = [
  { route: '/' },
  { route: '/cart' },
  { route: '/products' },
  { route: '/products/:id' },
]
