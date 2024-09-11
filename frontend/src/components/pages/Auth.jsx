import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import MessagePopup from "../utils/MessagePopup.jsx";
import { verifyToken } from "../utils/auth.js";
import { jwtDecode } from "jwt-decode";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [popUp, setPopUp] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleMessageClose = () => {
    setPopUp((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleMessageConfirm = () => {
    setPopUp((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await axios
        .post("http://localhost:5000/api/user/login", { email, password })
        .then((response) => {
          const decodedToken = jwtDecode(response.data.token);
          const isAdmin = decodedToken.role === "admin" ? true : false;
          auth.login(response.data.token, isAdmin, "userName");
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          setPopUp({
            isOpen: true,
            message: err.response.data.message,
            type: "error",
          });
        });
    } else {
      const role = isAdmin ? "admin" : "user";
      axios
        .post("http://localhost:5000/api/user/signup", {
          email,
          password,
          name,
          role,
        })
        .then((response) => {
          setPopUp({
            isOpen: true,
            message: response.data.message,
            type: "success",
          });
          setIsLogin(true);
        })
        .catch((err) => {});
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (verifyToken(token)) {
      const decodedToken = jwtDecode(token);
      const isAdmin = decodedToken.role === "admin" ? true : false;
      auth.login(token, isAdmin, "user");
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <React.Fragment>
      <MessagePopup
        isOpen={popUp.isOpen}
        message={popUp.message}
        type={popUp.type}
        onClose={handleMessageClose}
        onConfirm={handleMessageConfirm}
      />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5 text-gray-800">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form onSubmit={handleSubmit} className="px-5 py-7">
              {/* Conditional input for 'Name' in Signup */}
              {!isLogin && (
                <div className="mb-4">
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  placeholder="Enter your password"
                  required
                />
                {!isLogin && (
                  <label>
                    <input
                      type="checkbox"
                      className="border rounded-lg px-3 py-2 mt-2 mr-2 text-sm "
                      checked={isAdmin}
                      onChange={handleCheckboxChange}
                    />
                    Signup as Admin
                  </label>
                )}
              </div>

              <button
                type="submit"
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <div className="py-5">
              <div className="text-center">
                {isLogin ? (
                  <span className="text-gray-600 text-sm">
                    Don't have an account?
                  </span>
                ) : (
                  <span className="text-gray-600 text-sm">
                    Already have an account?
                  </span>
                )}
                <button
                  onClick={toggleAuthMode}
                  className="text-blue-500 hover:text-blue-700 text-sm font-semibold ml-2"
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthPage;
