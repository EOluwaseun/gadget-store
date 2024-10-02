/* eslint-disable react/prop-types */
import { GrClose } from 'react-icons/gr';
import ROLE from '../common/role.jsx';
import { useState } from 'react';
import SummaryApi from '../common/index.js';
import { toast } from 'react-toastify';

function ChangeUserRole({ name, email, role, onClose, userId, callFunc }) {
  const [userRole, setUserRole] = useState(role);

  const handleOnchange = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchData = await fetch(SummaryApi.updateUsers.url, {
      method: SummaryApi.updateUsers.method,
      credentials: 'include',

      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        role: userRole,
        userId: userId,
      }),
    });

    const dataResponse = await fetchData.json();
    // console.log(dataResponse);

    if (dataResponse.success) {
      toast.success(dataResponse.message);
      onClose();
      callFunc();
    }
  };
  return (
    <div
      className="fixed left-0 right-0 top-0 bottom-0 h-full z-10 
    flex justify-between items-center bg-black/50"
    >
      <div className="w-fit mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <GrClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>

        <p>Name:{name}</p>
        <p>Email:{email}</p>

        <div className="flex items-center justify-between my-4">
          <p>Role</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnchange}
          >
            {Object.values(ROLE).map((item, i) => {
              return <option key={i}>{item}</option>;
            })}
          </select>
        </div>
        <button
          onClick={updateUserRole}
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
        >
          Change Role
        </button>
      </div>
    </div>
  );
}

export default ChangeUserRole;
