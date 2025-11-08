// middleware/isauthmiddleware.js
import jwt from "jsonwebtoken";

const IsAuthMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(403).json({ message: "Invalid token payload" });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default IsAuthMiddleware;
