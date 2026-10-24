import validator from 'validator';
import User from '../model/usermodel.js';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'node:crypto';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client();
const authCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
});
import genToken, { genToken1 } from '../config/token.js';

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

    res.cookie("token", token, {
      ...authCookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
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

    res.cookie("token", token, {
      ...authCookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // getcurrentUser(req, res);
    // ✅ FIXED: Send only one response
    console.log("User logged in successfully:", user);
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

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (!clientId) {
      console.error("Google sign-in failed: GOOGLE_CLIENT_ID is not configured");
      return res.status(500).json({ message: "Google sign-in is not configured" });
    }

    if (typeof credential !== "string" || !credential) {
      return res.status(400).json({ message: "Google credential is required" });
    }

    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: clientId });
      payload = ticket.getPayload();
    } catch (error) {
      console.error("Google ID token verification failed:", error.message);
      return res.status(401).json({ message: "Google sign-in failed. Please try again." });
    }

    if (!payload?.email || !payload.email_verified) {
      return res.status(401).json({ message: "Google account email is not verified" });
    }

    let user = await User.findOne({ email: payload.email });
    if (!user) {
      const password = await bcrypt.hash(randomBytes(32).toString("hex"), 10);
      user = await User.create({
        name: payload.name || payload.email,
        email: payload.email,
        password,
      });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      ...authCookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Google sign-in successful",
    });
  } catch (error) {
    console.error("Google sign-in failed:", error.message);
    return res.status(500).json({ message: "Google sign-in failed. Please try again." });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", authCookieOptions());
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



//admin login
export const adminlogin = async (req, res) => {
  try {
    console.log("Admin login request body:", req.body);
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(400).json({ message: "All fields are required" });
    }

    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
      return res.status(401).json({ message: "Invalid admin credentials" });
    }
    const token = await genToken1(email);

    res.cookie("token", token, {
      ...authCookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    console.log("Admin logged in successfully");
    return res.status(200).json({
      email,
      token,
      message: "Admin login successful",
    });
    

  }catch (error) {
    console.error("Admin login failed:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}