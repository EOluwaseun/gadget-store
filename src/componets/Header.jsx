/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-comment-textnodes */
import logo from '../assest/logo.png';
import { GrSearch } from 'react-icons/gr';
import { FaCartShopping, FaRegCircleUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import { useState } from 'react';
import ROLE from '../common/role';

function Header() {
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.userLogout.url, {
      method: SummaryApi.userLogout.method,
      credentials: 'include',
    });
    const data = await fetchData.json();

    if (data.success) {
      +toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

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
          <div
            className="relative flex justify-center"
            onClick={() => setMenuDisplay((prev) => !prev)}
          >
            {user?._id && (
              <div className="text-3xl cursor-pointer">
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bottom-0  top-11 h-fit p-4 bg-white rounded shadow-lg">
                <nav onClick={() => setMenuDisplay((prev) => !prev)}>
                  {user.role === ROLE.ADMIN ? (
                    <Link
                      onClick={() => setMenuDisplay((prev) => !prev)}
                      to={'/admin-panel/all-products'}
                      className="whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block"
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    ''
                  )}
                </nav>
              </div>
            )}
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
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-full text-white bg-red-500 text-center hover:bg-red-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to={'/login'}
                className="px-3 py-2 rounded-full text-white bg-red-500 text-center hover:bg-red-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
