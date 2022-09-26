
import GlobalLayout from './pages/_layout'
import Index from './pages/index'
import ProductsId from './pages/products/[id]'
import ProductDetail from "./pages/products/[id]";
import MainPage from "./pages/index";
import ProductList from "./pages/products";
import Cart from "./pages/cart";


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
  { route: '/products/:id' },
]
