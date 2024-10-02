import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Signup from '../pages/Signup';
import AdminPage from '../pages/AdminPage';
import AllProducts from '../pages/AllProducts';
import AllUsers from '../pages/AllUsers';

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
