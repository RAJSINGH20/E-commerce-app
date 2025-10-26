import jwt from "jsonwebtoken";



const IsAuthMiddleware = (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        let verifytoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!verifytoken) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.userId = verifytoken.userId;
        next(); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default IsAuthMiddleware;