import React from 'react';

const MySchedule = () => {
  return (
    <div className="p-8 w-2/3 inline-block bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">My Schedule</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">This Week's Schedule</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
};

export default MySchedule;
