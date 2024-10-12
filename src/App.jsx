import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './componets/Header';
import Footer from './componets/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setProductCount] = useState(0);

  const fectchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
      // headers: {
      //   'content-type': 'application/json',
      // },
    });
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addProductToCartCount.url, {
      method: SummaryApi.addProductToCartCount.method,
      credentials: 'include',
      // headers: {
      //   'content-type': 'application/json',
      // },
    });
    const dataApi = await dataResponse?.json();
    // console.log(dataApi);
    setProductCount(dataApi?.data?.count);

    // if (dataApi.success) {
    //   dispatch(setUserDetails(dataApi.data));
    // }
  };

  useEffect(() => {
    fectchUserDetails();
    //userCart product
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{ fectchUserDetails, cartProductCount, fetchUserAddToCart }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-110px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
