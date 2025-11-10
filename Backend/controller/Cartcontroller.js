import User from "../model/usermodel.js";

export const addtocart = async (req, res) => {
  try {
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({ error: "Item ID and size are required" });
    }

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }

    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      console.log("User not found with ID:", req.userId);
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Always initialize cartData if missing
    if (!user.cartData) {
      user.cartData = {};
    }

    // ✅ Add or update the cart item
    if (!user.cartData[itemId]) user.cartData[itemId] = {};
    user.cartData[itemId][size] = (user.cartData[itemId][size] || 0) + 1;

    // ✅ Force Mongoose to recognize the field as modified
    user.markModified("cartData");

    // ✅ Save and verify
    await user.save();

    res.status(200).json({
      message: "Item added to cart successfully",
      cart: user.cartData,
    });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: err.message });
  }
};



export const updatecart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;

        const user = await User.findById(req.userId).select("-password");
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized: Missing user ID" });
        }

        if (!user) {
            console.log("User not found with ID:", req.userId);
            return res.status(404).json({ message: "User not found" });
        }
        const cartData = user.cartData || {};

        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = quantity;

        user.cartData = cartData;
        await user.save();

        res.status(200).json({ message: "Cart updated", cart: user.cartData });
    } catch (err) {
        console.error("Update cart error:", err);
        res.status(500).json({ error: err.message });
    }
};


export const currentuser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized: Missing user ID" });
        }

        if (!user) {
            console.log("User not found with ID:", req.userId);
            return res.status(404).json({ message: "User not found" });
        }
        const cartData = user.cartData || {};
        res.status(200).json(cartData);
    } catch (err) {
        console.error("Current user fetch error:", err);
        res.status(500).json({ error: err.message });
    }
};
