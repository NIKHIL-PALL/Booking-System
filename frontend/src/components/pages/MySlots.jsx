import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import MessagePopup from "../utils/MessagePopup";
import { jwtDecode } from "jwt-decode";
import EditSlot from "../utils/EditSlot";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MySlots = () => {
  const [slots, setSlots] = useState([]);
  const auth = useContext(AuthContext);
  const [popUp, setPopUp] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [isEdit, setIsEdit] = useState(null);

  const handleSlotEdit = async (slotId) => {
    
  };

  

  const handleSlotDelete = async (slotIndex) => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    };
    axios
      .delete(`http://localhost:5000/api/slot/${slotIndex}`, { headers })
      .then((response) => {
        console.log(response.data);
        fetchSlots();
      })
      .catch((err) => {
        console.log(err)
      });
  };
  const fetchSlots = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    };
    const decodedToken = jwtDecode(auth.token);
    const userId = decodedToken.userId;
    await axios
      .get(`http://localhost:5000/api/slot/${userId}`, { headers })
      .then((response) => {
        console.log(response.data);
        setSlots(response.data);
      })
      .catch((err) => {
        console.log(err);
        setPopUp({
          isOpen: true,
          type: "error",
          message: err.response.data.message,
        });
      });
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <React.Fragment>
      <MessagePopup
        isOpen={popUp.isOpen}
        message={popUp.message}
        type={popUp.type}
        onClose={(e) => setPopUp((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={(e) => setPopUp((prev) => ({ ...prev, isOpen: false }))}
      />

      <div className="p-8 w-2/3 inline-block bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">My Slots</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {slots.map((slot, ind) => (
            <div key={ind} className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                {slot.day}
              </h2>
              {slot?.slots?.map((s, index) => (
                <span className="flex justify-around">
                  <div key={index} className="flex items-center mb-4">
                    {s.start}
                    <span className="text-gray-500 mx-6">to</span>
                    {s.end}
                  </div>
                  <span>
                  <button className="p-2 m-3 text-white bg-blue-500 rounded-sm" onClick={(e) => setIsEdit(s._id)}>Edit</button>
                  <button className="p-2 m-3 text-white bg-blue-500 rounded-sm" onClick={(e) => handleSlotDelete(index)}>
                    Delete
                  </button>
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MySlots;
