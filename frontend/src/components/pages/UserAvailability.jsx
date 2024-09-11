import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import MessagePopup from "../utils/MessagePopup";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const UserAvailability = () => {
  const [availability, setAvailability] = useState({});
  const auth = useContext(AuthContext);
  const [popUp, setPopUp] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  // Handle adding a new slot for a particular day
  const handleAddSlot = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), { start: "", end: "" }],
    }));
  };

  // Handle changing a slot's time (either start or end)
  const handleSlotChange = (day, index, field, value) => {
    const updatedDaySlots = availability[day].map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    setAvailability((prev) => ({
      ...prev,
      [day]: updatedDaySlots,
    }));
  };

  // Handle saving the availability data to the backend
  const handleSave = async () => {
    try {
      for (const day of Object.keys(availability)) {
        const slots = availability[day];
        // Make API call to save slots for each day
        const headers = {
          'Authorization': `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        };
        await axios.post(
          "http://localhost:5000/api/slot/createSlot",
          {
            day,
            slots,
          },
          { headers }
        );
      }
      setPopUp({
        isOpen: true,
        type: "success",
        message: "Availability saved successfully!",
      });
    } catch (error) {
      setPopUp({
        isOpen: true,
        type: "error",
        message: "Failed to save availability.",
      });
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <MessagePopup
        isOpen={popUp.isOpen}
        message={popUp.message}
        type={popUp.type}
        onClose={(e) => setPopUp(prev => ({...prev, isOpen : false}))}
        onConfirm={(e) => setPopUp(prev => ({...prev, isOpen : false}))}
      />

      <div className="p-8 w-2/3 inline-block bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          Set Your Availability
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {daysOfWeek.map((day) => (
            <div key={day} className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                {day}
              </h2>
              {(availability[day] || []).map((slot, index) => (
                <div key={index} className="flex items-center mb-4">
                  <input
                    type="time"
                    value={slot.start}
                    onChange={(e) =>
                      handleSlotChange(day, index, "start", e.target.value)
                    }
                    className="w-1/3 p-2 border rounded-lg focus:outline-none focus:border-blue-500 mr-4"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={slot.end}
                    onChange={(e) =>
                      handleSlotChange(day, index, "end", e.target.value)
                    }
                    className="w-1/3 p-2 border rounded-lg focus:outline-none focus:border-blue-500 ml-4"
                  />
                </div>
              ))}
              <button
                onClick={() => handleAddSlot(day)}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                + Add Time Slot
              </button>
            </div>
          ))}
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 mt-6"
          >
            Save Availability
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserAvailability;
