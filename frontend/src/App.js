import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./components/pages/Auth";
import Dashboard from "./components/pages/Dashboard";
import MySchedule from "./components/pages/MySchedule";
import Notifications from "./components/pages/Notification";
import ManageSessions from "./components/pages/Session";
import UserAvailability from "./components/pages/UserAvailability";
import SideBar from "./components/SideBar";
import AuthContext from "./context/AuthContext";
import { useState } from "react";
import MessagePopup from "./components/utils/MessagePopup";
import MySlots from "./components/pages/MySlots";
import AllSessions from "./components/pages/AllSessions";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setUserToken] = useState(null);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [type, setType] = useState("");
  const onClose = () => {
    setIsOpen(false);
  };

  const onConfirm = () => {
    setIsOpen(false);
  };
  const login = (token, admin, name) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setName(name);
    setUserToken(token);
    setIsAdmin(admin);
  };
  const logout = () => {

    localStorage.clear();
    setIsLoggedIn(false);
    setName("");
    setUserToken(null);

  };
 
  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          token,
          name,
          login,
          logout,
          isOpen,
          message,
          setMessage,
          setIsOpen,
          setType,
          type,
          onClose,
          onConfirm,
          isAdmin,
          setIsAdmin
        }}
      >
        {isLoggedIn && <SideBar />}
        {<MessagePopup />}
        <Routes>
          <Route exact path="/" Component={Auth}></Route>
          <Route exact path="/dashboard" Component={Dashboard}></Route>
          <Route exact path="/my-schedule" Component={MySchedule}></Route>
          <Route exact path="/notification" Component={Notifications}></Route>
          <Route
            exact
            path="/manage-session"
            Component={ManageSessions}
          ></Route>
          <Route
            exact
            path="/user-availability"
            Component={UserAvailability}
          ></Route>
          <Route
            exact
            path="/user-slots"
            Component={MySlots}
          ></Route>
          <Route
            exact
            path="/all-sessions"
            Component={AllSessions}
          ></Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
