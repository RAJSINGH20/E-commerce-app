import validator from 'validator';
import User from '../model/usermodel.js';
import bcrypt from 'bcryptjs';
import genToken from '../config/token.js';
import { getcurrentUser } from './usercontroller.js';

export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // Hash password
    const hashpassword = await bcrypt.hash(password, 10);

    // Create new user
    const newuser = await User.create({
      name,
      email,
      password: hashpassword
    });

    // Generate token
    const token = await genToken(newuser._id);

    // ✅ FIXED: Correct option name is `maxAge` (lowercase)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("User registered successfully:", newuser);
    // ✅ FIXED: Send only one response
    return res.status(201).json({
      _id: newuser._id,
      name: newuser.name,
      email: newuser.email,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("User registration failed:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const login = async (req, res) => {
    try {
    let { email, password } = req.body;
    console.log("Login request body:", req.body);
    
    // Validate required fields
    if (!email || !password) {
        return res.status(402).json({ message: "All fields are required" });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "Invalid email or password" });
    }
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(406).json({ message: "Invalid email or password" });
    }
    
    
    
    const token = await genToken(user._id);
    
    // ✅ FIXED: Correct option name is `maxAge` (lowercase)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("User logged in successfully:", user);
    getcurrentUser(req, res);
    // ✅ FIXED: Send only one response
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      message: "User login successfully",
    });

  } catch (error) {
    console.error("User login failed:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        console.log("User logged out successfully");
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("User logout failed:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};