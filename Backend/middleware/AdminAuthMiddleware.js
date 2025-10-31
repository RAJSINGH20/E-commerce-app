import jwt  from "jsonwebtoken";


const AdminAuth = (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET);

        if (!verify) {
            return res.status(403).json({ message: "Invalid token" });
            console.log("Login again invalid token");
        }
        req.AdminEmail = process.env.ADMIN_EMAIL;
        next();
    } catch (error) {
        console.error("AdminAuth error:", error);
        res.status(500).json({ message: error.message });
    }
}
export default AdminAuth;