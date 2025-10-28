import jwt from "jsonwebtoken";



const IsAuthMiddleware = (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid token" });
            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default IsAuthMiddleware;