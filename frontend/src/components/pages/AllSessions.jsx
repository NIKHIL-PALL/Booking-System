import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import convertTo12HourFormat from "../utils/TimeFormat";

const AllSessions = () => {
  const [allSessions, setAllSessions] = useState([]);
  const auth = useContext(AuthContext);
  const fetchAllSessions = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    };
    axios
      .get("http://localhost:5000/api/session/", { headers })
      .then((response) => {
        setAllSessions(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchAllSessions();
  }, []);
  return (
    <div className="p-8 w-2/3 inline-block bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        All sessions
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          This Week's Schedule
        </h2>
        <div
            className="my-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
        {allSessions?.map((session, ind) => (
          
            <div key={ind} className="bg-blue-100 p-4 rounded-lg">
              <h4 className="text-blue-700 font-semibold">{session.day}</h4>
              <p className="text-blue-600 mt-2">
                {convertTo12HourFormat( session.start)} - {convertTo12HourFormat( session.end)}
              </p>
              <h4 className="text-blue-700 font-semibold">Participants : </h4>

              <ul>

              {session.participants?.map((participant, index) => (
                <li className="text-blue-700 font-semibold" key={participant._id}>
                 
                  {`${index + 1}. ${participant.name}`}
                </li>
              ))}
            </ul>
           

            </div>
            
          ))}
          </div>
      </div>
    </div>
  );
};

export default AllSessions;
