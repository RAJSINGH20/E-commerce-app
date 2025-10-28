import User from "../model/usermodel.js";

export const getcurrentUser = async (req, res) => {
  try {
    console.log("Fetching current user with ID:", req.userId);

    // ✅ use a different variable name (e.g., userData)
    const userData = await User.findById(req.userId).select("-password");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
