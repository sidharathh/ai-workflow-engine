const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 🔹 Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// 🔹 Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  res.json({
    _id: user._id,
    token: generateToken(user._id),
  });
};

// 🔹 Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};