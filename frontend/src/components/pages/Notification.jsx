import React from 'react';

const Notifications = () => {
  return (
    <div className="p-8 w-2/3 inline-block bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Notifications</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Notifications</h2>
        <ul className="space-y-4">
          <li className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="text-gray-700">Your session with John Doe has been confirmed for Monday, 10:00 AM.</p>
          </li>
          <li className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="text-gray-700">Reminder: Your session with Jane Smith is scheduled for Wednesday, 2:00 PM.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
