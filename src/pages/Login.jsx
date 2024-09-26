/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import logo from '../assest/signin.gif';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-6 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={logo} />
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>
                Email :
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    placeholder="enter email"
                    className="w-full outline-none bg-transparent"
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>

            <div>
              <div>
                <label>
                  Password :
                  <div className="bg-slate-100 p-2 flex items-center">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={data.password}
                      placeholder="enter password"
                      className="w-full outline-none bg-transparent"
                      onChange={handleChange}
                    />
                    <div
                      className="cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                    </div>
                  </div>
                </label>
              </div>
              <Link
                to={'/forgot-password'}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot password
              </Link>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
            >
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have account?{' '}
            <Link
              to={'/signup'}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
