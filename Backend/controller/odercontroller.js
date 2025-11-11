import Order from "../model/ordermodel.js";
import User from "../model/usermodel.js";

export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    console.log(req.body);

    const orderdata = {
      items,
      amount,
      address,
      userId,
      paymentmethod: "COD", // ✅ fixed
      payment: false, // ✅ consistent
      date: Date.now(),
    };

    const newOrder = new Order(orderdata);
    await newOrder.save();
    console.log("orderdata", orderdata);

    await User.findByIdAndUpdate(userId, { cartData: {} }); // ✅ fixed

    return res.status(201).json({ message: "Order Placed" });
  } catch (error) {
    console.log("Order Placed Error", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};
