import { Link } from 'react-router-dom';
import successImg from '../assest/success-img.gif';

function Success() {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex flex-col justify-center items-center p-6 mt-2 rounded">
      <img
        src={successImg}
        width={200}
        height={200}
        className="mix-blend-multiply"
      />
      <p className="text-green-600 font-bold text-3xl">Payment Successfully</p>

      <Link
        to={'/order'}
        className="p-2 m-4 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white"
      >
        See order
      </Link>
    </div>
  );
}

export default Success;
