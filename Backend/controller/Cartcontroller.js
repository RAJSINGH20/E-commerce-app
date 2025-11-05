import User from "../model/usermodel";

export const addtocart = async (req, res) => {
    try {
        // Assuming the request body is like { itemId, size }
        const { itemId, size } = req.body; 
        
        if (!itemId || !size) {
            return res.status(400).json({ error: 'Item ID and size are required' });
        }

        // Find user by ID (ensure req.userid is populated by your authentication middleware)
        const user = await User.findById(req.userid);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Use cartData object from user document (initialize if missing)
        
        const cartData = user.cartData || {};

        // If the item already exists in the cart, increment the quantity for the selected size
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            // If the item doesn't exist, create a new entry
            cartData[itemId]={}
            cartData[itemId][size] = 1
        }

        // Persist changes back to the user document
        await User.findByIdAndUpdate(req.userid,{cartData})
        

        res.status(200).json({ message: 'Item added to cart', cart: user.cartData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


export const updatecart = async (req, res) => {
    try {
        // TODO: implement update cart logic
        res.status(200).json({ message: 'Cart updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const currentuser = async (req, res) => {
    try {
        // TODO: implement current user retrieval
        res.status(200).json({ user: null });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}