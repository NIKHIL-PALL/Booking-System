import React, { useState } from "react";

const EditSlot = ({ slot, onSave, onCancel , title}) => {
  const [startTime, setStartTime] = useState(slot.start);
  const [endTime, setEndTime] = useState(slot.end);

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...slot,
        start: startTime,
        end: endTime,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
        <div className="flex items-center mb-4">
          <label className="w-1/4 text-gray-600">Start:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-3/4 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-1/4 text-gray-600">End:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-3/4 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSlot;
