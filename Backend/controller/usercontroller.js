import User from "../model/usermodel.js";

export const getcurrentUser = async (req, res) => {
  try {
    
    // ✅ use a different variable name (e.g., userData)
    const userData = await User.findById(req.userId).select("-password");
    
    if (!userData) {
      console.log("User not found with ID:", req.userId);
      return res.status(404).json({ message: "User not found" });
    }
    console.log("Fetching current user with ID:", req.userId);

    return res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
