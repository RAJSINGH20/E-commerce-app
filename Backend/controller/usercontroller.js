import User from "../model/usermodel.js";

export const getcurrentUser = async (req, res) => {
  try {
    // ✅ Ensure middleware attached req.userId
    const user = await User.findById(req.userId).select("-password");
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }


    if (!user) {
      console.log("User not found with ID:", req.userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Fetched current user:", user.name, "ID:", req.userId);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getadmin = async (req, res) => {
  try {
    let AdminEmail = req.AdminEmail;


    if (!AdminEmail) {
      return res.status(401).json({ message: "Unauthorized: No admin email provided" });
    }
    return res.status(200).json({ email: AdminEmail , role:"admin" });



  } catch (error) {


    console.error("Error fetching get admin :", error);
    res.status(500).json({ message: error.message });
  }
}
