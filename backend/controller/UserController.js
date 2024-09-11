const User = require("../model/User");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

dotEnv.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Please fill all the details." });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password === password) {
      const payload = {
        userId: user._id,
        email: user.email,
        password: user.password,
        role : user.role
      };
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: "8h",
      });
      return res.status(200).json({ token, message: "Succesfully logged in" });
    }
    return res.status(401).json({ message: "Incorrect password" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Please fill all the details" });
  if (!email.includes("@"))
    return res.status(400).json({ message: "Email must contain @" });
  if (password.length < 6)
    return res
      .status(409)
      .json({ message: "Password must contain atleast 6 letters." });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists. Please login instead." });
    }
    const newUser = await User({ name, email, password, role });
    newUser.save();

    return res.status(201).json({message : "Successfully signed up."});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User does not found." });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  signup,
  getUserById,
  getAllUsers,
};
