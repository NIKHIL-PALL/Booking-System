import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import ScheduleUserSlot from "./ScheduleUserSlot";

const ManageSessions = () => {
  const [users, setAllUsers] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const auth = useContext(AuthContext);

  const fetchAllUsers = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    };
    axios
      .get("http://localhost:5000/api/user/", { headers })
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleOnConfirm = async() => {
    setShowUser(false);
  }

  useEffect(() => {
    if (auth.isAdmin) {
      fetchAllUsers();
    }
  }, []);
  return (
    <div className="p-8 w-2/3 inline-block bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Manage Sessions
      </h1>
      {auth.isAdmin ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            All Users
          </h2>
          <ul className="space-y-4">
            {users.map((user, ind) => (
              <li key={ind} className="bg-gray-50 p-4 rounded-lg shadow">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-gray-700 font-semibold">{user.name}</h4>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <button onClick={(e) => setShowUser(user._id)}  className="text-red-500 hover:text-red-700">
                    Schedule
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          This Page is only for admin
        </h2>
      )}

      {showUser && <ScheduleUserSlot onConfirm={handleOnConfirm}  onClose={(e) => setShowUser(false)} userId = {showUser}/>}
    </div>
  );
};

export default ManageSessions;
