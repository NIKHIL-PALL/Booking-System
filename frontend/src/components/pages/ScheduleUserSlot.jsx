import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import MessagePopup from "../utils/MessagePopup";
import EditSlot from "../utils/EditSlot";
import isIntervalWithinInterval from "../utils/ValidateTime";
import convertTo12HourFormat from "../utils/TimeFormat";

const ScheduleUserSlot = ({ userId, onConfirm, onClose }) => {
  const [slots, setSlots] = useState([]);
  const auth = useContext(AuthContext);
  const [popUp, setPopUp] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [isEditSlot, setIsEditSlot] = useState(null);

  const handleSessionSave = async ({ start, end }) => {
    if (
      !isIntervalWithinInterval(start, end, isEditSlot.start, isEditSlot.end)
    ) {
      setIsEditSlot(null);
      setPopUp({
        isOpen: true,
        type: "error",
        message: "Please select the interval within slot time.",
      });
      return;
    }
    const sessionType = "One-to-One";

    const headers = {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    };
    axios
      .post(
        "http://localhost:5000/api/session/",
        {
          day: isEditSlot.day,
          sessionType,
          userId,
          start,
          end,
        },
        { headers }
      )
      .then((response) => {
        fetchSlots();
      })
      .catch((err) => {
        console.log(err.message);
      });
    setIsEditSlot(null);
  };
  const handleSessionCancel = async () => {
    setIsEditSlot(null);
  };

  const fetchSlots = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    };

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
      <div className="fixed pt-20 inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 overflow-y-auto">
        <MessagePopup
          isOpen={popUp.isOpen}
          message={popUp.message}
          type={popUp.type}
          onClose={(e) => setPopUp((prev) => ({ ...prev, isOpen: false }))}
          onConfirm={(e) => setPopUp((prev) => ({ ...prev, isOpen: false }))}
        />
        {isEditSlot && (
          <EditSlot
            title={"Schedule time"}
            slot={isEditSlot}
            onSave={handleSessionSave}
            onCancel={handleSessionCancel}
          />
        )}

        <div className="p-8 w-2/3 inline-block bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">
            Schedule Session
          </h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            {slots.length === 0 && (
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                This user does not have any free slots.
              </h2>
            )}
            {slots.length > 0 &&
              slots.map((slot, ind) => (
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
                            setIsEditSlot({
                              day: slot.day,
                              index,
                              start: s.start,
                              end: s.end,
                            })
                          }
                        >
                          Schedule time
                        </button>
                      </span>
                    </span>
                  ))}
                </div>
              ))}
          </div>
          <div className="my-4">
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScheduleUserSlot;
