import { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdEdit } from 'react-icons/md';
import ChangeUserRole from '../componets/ChangeUserRole.jsx';

function AllUsers() {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: '',
    name: '',
    role: '',
    _id: '',
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUsers.url, {
      method: SummaryApi.allUsers.method,
      credentials: 'include',
    });

    const dataResponse = await fetchData.json();
    // console.log(dataResponse);
    if (dataResponse.success) {
      setAllUser(dataResponse.data);
      // console.log(allUser);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div>
      <table className="w-full user-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {allUser?.map((el, index) => {
            return (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format('LL')}</td>
                <td>
                  <button
                    name={updateUserDetails.name}
                    onClick={() => {
                      setUpdateUserDetails(el), setOpenUpdateRole(true);
                    }}
                    className="bg-green-400 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
}

export default AllUsers;
