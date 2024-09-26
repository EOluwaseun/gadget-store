import logo from '../assest/logo.png';
import { GrSearch } from 'react-icons/gr';
import { FaCartShopping, FaRegCircleUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div>
          <Link to={'/'}>
            <img src={logo} className="w-10 h-10" />
          </Link>
        </div>
        <div
          className="hidden lg:flex items-center w-full justify-between 
        max-w-sm border-[0.25px] rounded-full pl-2 focus-within:shadow"
        >
          <input
            type="text"
            placeholder="search product here.."
            className="w-full outline-none"
          />

          <div className="text-lg min-w-[50px] h-8 bg-red-500 text-white flex items-center justify-center rounded-r-full">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="text-3xl cursor-pointer">
            <FaRegCircleUser />
          </div>
          <div className="text-2xl cursor-pointer relative">
            <span>
              <FaCartShopping />
            </span>
            <div className="absolute -top-2 -right-3 bg-red-500 text-white w-5 p-1 flex items-center justify-center h-5 rounded-full">
              <p className="text-xl">0</p>
            </div>
          </div>
          <div>
            <Link
              to={'/login'}
              className="px-3 py-2 rounded-full text-white bg-red-500 text-center hover:bg-red-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
