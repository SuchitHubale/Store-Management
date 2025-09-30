import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import User from "../model/User.js"
export const registerUser = async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const newUser = new User({ name, email, contact, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed ❌", error: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const secretKey = process.env.secretKey;
    const expire = process.env.expire;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials ❌" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials ❌" });

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: expire });

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role:user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed ❌", error: error.message });
  }
};

