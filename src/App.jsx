import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './componets/Header';
import Footer from './componets/Footer';

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-110px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
