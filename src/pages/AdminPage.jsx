import { useEffect } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

function AdminPage() {
  const user = useSelector((state) => state?.user?.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role != ROLE.ADMIN) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex hidden md:flex">
      <aside className="bg-white w-full min-h-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-3xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize font-semibold text-lg">{user?.name}</p>
          <p className="text-xl">{user?.role}</p>
        </div>

        {/* navigation */}

        <div>
          <nav className="grid p-4">
            <Link to={'all-users'} className="px-4 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={'all-products'} className="px-4 py-1 hover:bg-slate-100">
              Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPage;
