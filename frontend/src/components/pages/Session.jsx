import React from 'react';

const ManageSessions = () => {
  return (
    <div className="p-8 w-2/3 inline-block bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Manage Sessions</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Upcoming Sessions</h2>
        <ul className="space-y-4">
          <li className="bg-gray-50 p-4 rounded-lg shadow">
            <div className="flex justify-between">
              <div>
                <h4 className="text-gray-700 font-semibold">Session with John Doe</h4>
                <p className="text-gray-600">Monday, 10:00 AM - 11:00 AM</p>
              </div>
              <button className="text-red-500 hover:text-red-700">Cancel</button>
            </div>
          </li>
          <li className="bg-gray-50 p-4 rounded-lg shadow">
            <div className="flex justify-between">
              <div>
                <h4 className="text-gray-700 font-semibold">Session with Jane Smith</h4>
                <p className="text-gray-600">Wednesday, 2:00 PM - 3:00 PM</p>
              </div>
              <button className="text-red-500 hover:text-red-700">Cancel</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ManageSessions;
