/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import logo from '../assest/signin.gif';
import { useState } from 'react';
import imageToBase64 from '../helpers/imageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    profilePic: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const uploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);

    // console.log('imagePic', imagePic);
    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate('/login');
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      console.log('please check password');
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-6 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={!data.profilePic ? logo : data.profilePic} />
            </div>
            <form>
              <label>
                <div className="cursor-pointer text-xs pb-4 pt-2 text-center bg-slate-200 absolute bottom-0 w-full bg-opacity-80">
                  Upload Photo
                </div>
                <input type="file" className="hidden" onChange={uploadPic} />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>
                Name :
                <div className="bg-slate-100 p-2">
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    required
                    placeholder="enter name"
                    className="w-full outline-none bg-transparent"
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>
            <div className="grid">
              <label>
                Email :
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    name="email"
                    required
                    value={data.email}
                    placeholder="enter email"
                    className="w-full outline-none bg-transparent"
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>

            <div>
              <label>
                Password :
                <div className="bg-slate-100 p-2 flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
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

            <div>
              <label>
                Confirm Password :
                <div className="bg-slate-100 p-2 flex items-center">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    value={data.confirmPassword}
                    placeholder="enter confirm password"
                    className="w-full outline-none bg-transparent"
                    onChange={handleChange}
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    <span>
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
            >
              Signup
            </button>
          </form>
          <p className="my-5">
            Already have an account?{' '}
            <Link
              to={'/login'}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Signup;
