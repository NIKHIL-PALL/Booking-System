import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function SideBar() {
  const [isActive, setIsActive] = useState(0);
  const navigate = useNavigate();
  const auth = useContext(AuthContext)
  const handleSideBarClick = (ind) => {
    setIsActive(ind);
  };
  return (
    <aside className="w-64 inline-block bg-white shadow-md">
      <div className="px-6 py-4 absolute top-0">
        <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
      </div>
      <nav className="mt-8 absolute top-10">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              onClick={(e) => handleSideBarClick(0)}
              className={`block px-6 py-2 ${
                isActive === 0 ? "bg-blue-500 text-white" : "text-gray-700 "
              } hover:bg-blue-500 hover:text-white rounded-lg`}
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => handleSideBarClick(1)}
              to="my-schedule"
              className={`block px-6 py-2 ${
                isActive === 1 ? "bg-blue-500 text-white" : "text-gray-700 "
              }  hover:bg-blue-500 hover:text-white rounded-lg`}
            >
              My Schedule
            </Link>
          </li>
          <li>
            <Link
              to="manage-session"
              onClick={(e) => handleSideBarClick(2)}
              className={`block px-6 py-2 ${
                isActive === 2 ? "bg-blue-500 text-white" : "text-gray-700 "
              }  hover:bg-blue-500 hover:text-white rounded-lg`}
            >
              Manage Sessions
            </Link>
          </li>
          <li>
            {!auth.isAdmin && <Link
              to="user-availability"
              onClick={(e) => handleSideBarClick(3)}
              className={`block px-6 py-2 ${
                isActive === 3 ? "bg-blue-500 text-white" : "text-gray-700 "
              }  hover:bg-blue-500 hover:text-white rounded-lg`}
            >
              Set Slots
            </Link>}
            
          </li>
          <li>
            {!auth.isAdmin && <Link
              to="user-slots"
              onClick={(e) => handleSideBarClick(4)}
              className={`block px-6 py-2 ${
                isActive === 4 ? "bg-blue-500 text-white" : "text-gray-700 "
              }  hover:bg-blue-500 hover:text-white rounded-lg`}
            >
              My Slots
            </Link>}
          </li>
          <li>
            <Link
              to="notification"
              onClick={(e) => handleSideBarClick(5)}
              className={`block px-6 py-2 ${
                isActive === 5 ? "bg-blue-500 text-white" : "text-gray-700 "
              }  hover:bg-blue-500 hover:text-white rounded-lg`}
            >
              Notifications
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={(e) => {auth.logout(); navigate("/")}}
              className={`block px-6 py-2 ${
                isActive === 6 ? "bg-blue-500 text-white" : "text-gray-700 "
              }  hover:bg-blue-500 hover:text-white rounded-lg`}
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
