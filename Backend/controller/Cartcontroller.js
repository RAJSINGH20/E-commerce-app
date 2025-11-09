import User from "../model/usermodel.js";

export const addtocart = async (req, res) => {
    try {
        const { itemId, size } = req.body;

        if (!itemId || !size) {
            return res.status(400).json({ error: "Item ID and size are required" });
        }

        const user = await User.findById(req.userId).select("-password");
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized: Missing user ID" });
        }



        // ✅ use a different variable name (e.g., user)

        if (!user) {
            console.log("User not found with ID:", req.userId);
            return res.status(404).json({ message: "User not found" });
        }
        // ✅ Initialize cartData if missing
        const cartData = user.cartData || {};

        // ✅ Add or update the cart item
        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        // ✅ Save updated cart data
        user.cartData = cartData;
        await user.save();

        res.status(200).json({ message: "Item added to cart", cart: user.cartData });
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
