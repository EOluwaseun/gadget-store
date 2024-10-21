import { Link } from 'react-router-dom';
import cancelImg from '../assest/failed-img.gif';

function Cancel() {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex flex-col justify-center items-center p-6 mt-2 rounded">
      <img
        src={cancelImg}
        width={200}
        height={200}
        className="mix-blend-multiply"
      />
      <p className="text-red-600 font-bold text-3xl">Payment Failed!</p>

      <Link
        to={'/cart'}
        className="p-2 m-4 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white"
      >
        Go to cart
      </Link>
    </div>
  );
}

export default Cancel;
