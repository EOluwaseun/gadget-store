import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Signup from '../pages/Signup';
import AdminPage from '../pages/AdminPage';
import AllProducts from '../pages/AllProducts';
import AllUsers from '../pages/AllUsers';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import Success from '../pages/success';
import Cancel from '../pages/Cancel';
import OrderPage from '../pages/OrderPage';
// import Question from '../pages/question';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        // path: 'product-category/category/:categories/brand:brands?',
        path: 'product-category/category/:categories/*',

        element: <CategoryProduct />,
      },
      {
        path: 'product-category',

        element: <CategoryProduct />,
      },

      // {
      //   path: 'category',
      //   element: <CategoryProduct />,
      // },

      {
        path: 'product/:id',
        element: <ProductDetails />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'success',
        element: <Success />,
      },
      {
        path: 'cancel',
        element: <Cancel />,
      },
      {
        path: 'search',
        element: <SearchProduct />,
      },
      {
        path: 'order',
        element: <OrderPage />,
      },
      {
        path: 'admin-panel',
        element: <AdminPage />,
        children: [
          {
            path: 'all-users',
            element: <AllUsers />,
          },
          {
            path: 'all-products',
            element: <AllProducts />,
          },
        ],
      },
    ],
  },
]);

export default router;
