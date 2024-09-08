import React from 'react';

const Dashboard = () => {
  return (
    <div className='inline-block w-2/3'>
    <div className="flex  h-screen  bg-gray-100">
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
            Add New Event
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Sessions Today</h3>
            <p className="text-gray-600 mt-2">You have 3 upcoming sessions.</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Sessions</h3>
            <p className="text-gray-600 mt-2">You have completed 15 sessions.</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Notifications</h3>
            <p className="text-gray-600 mt-2">You have 5 new notifications.</p>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700">Your Schedule</h3>
          <p className="text-gray-600 mt-2">Here is your schedule for the week:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h4 className="text-blue-700 font-semibold">Monday</h4>
              <p className="text-blue-600 mt-2">10:00 AM - 12:00 PM</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h4 className="text-blue-700 font-semibold">Wednesday</h4>
              <p className="text-blue-600 mt-2">2:00 PM - 4:00 PM</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h4 className="text-blue-700 font-semibold">Friday</h4>
              <p className="text-blue-600 mt-2">9:00 AM - 11:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
