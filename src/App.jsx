import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './componets/Header';
import Footer from './componets/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();

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

  useEffect(() => {
    fectchUserDetails();
  }, []);
  return (
    <>
      <Context.Provider value={{ fectchUserDetails }}>
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-110px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
