import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import convertTo12HourFormat from "../utils/TimeFormat";

const MySchedule = () => {
  const auth = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);

  const fetchMySessions = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    };
    const decodedToken = jwtDecode(auth.token);
    const { userId } = decodedToken;
    axios
      .get(`http://localhost:5000/api/session/${userId}`, { headers })
      .then((response) => {
        setSessions(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchMySessions();
  }, []);
  return (
    <div className="p-8 w-2/3 inline-block bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">My Schedule</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          This Week's Schedule
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div key={session._id} className="bg-blue-100 p-4 rounded-lg">
              <h4 className="text-blue-700 font-semibold">{session.day}</h4>
              <p className="text-blue-600 mt-2">
                {convertTo12HourFormat(session.start)} -{" "}
                {convertTo12HourFormat(session.end)}
              </p>
              {session.participants.map((participant, index) => (

              <p key={index} className="text-blue-600 mt-2">
                {`${index + 1}. ${participant.name}`}
              </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySchedule;
