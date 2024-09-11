import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import MessagePopup from "../utils/MessagePopup";
import { jwtDecode } from "jwt-decode";
import EditSlot from "../utils/EditSlot";
import convertTo12HourFormat from "../utils/TimeFormat";

const MySlots = () => {
  const [slots, setSlots] = useState([]);
  const auth = useContext(AuthContext);
  const [popUp, setPopUp] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [isEdit, setIsEdit] = useState(null);

  const handleSlotEditSave = async (slot) => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    };
    axios
      .patch(
        "http://localhost:5000/api/slot/updateSlotTime",
        {
          day: isEdit.day,
          index: isEdit.index,
          newStart: slot.start,
          newEnd: slot.end,
        },
        { headers }
      )
      .then((response) => {
        fetchSlots();
      })
      .catch((err) => {
        console.log(err.message);
      });
    setIsEdit(null);
  };
  const handleSlotCancel = async () => {
    setIsEdit(null);
  };

  const handleSlotDelete = async (slotId, slotDay) => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    };
    axios
      .delete(`http://localhost:5000/api/slot/${slotId}/${slotDay}`, {
        headers,
      })
      .then((response) => {
        fetchSlots();
      })
      .catch((err) => {
        console.log(err);
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
      {isEdit && (
        <EditSlot
          slot={isEdit}
          title={"Edit Slot"}
          onSave={handleSlotEditSave}
          onCancel={handleSlotCancel}
        />
      )}

      <div className="p-8 w-2/3 inline-block bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">My Slots</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {slots.map((slot, ind) => (
            <div key={ind} className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                {slot.day}
              </h2>
              {slot?.slots?.map((s, index) => (
                <span key={index} className="flex justify-around">
                  <div key={index} className="flex items-center mb-4">
                    {convertTo12HourFormat(s.start)}
                    <span className="text-gray-500 mx-6">to</span>
                    {convertTo12HourFormat(s.end)}
                  </div>
                  <span>
                    <button
                      className="p-2 m-3 text-white bg-blue-500 rounded-sm"
                      onClick={(e) =>
                        setIsEdit({
                          day: slot.day,
                          index,
                          start: s.start,
                          end: s.end,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="p-2 m-3 text-white bg-blue-500 rounded-sm"
                      onClick={(e) => handleSlotDelete(s._id, slot.day)}
                    >
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
