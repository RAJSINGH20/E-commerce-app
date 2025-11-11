import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/Authcontext.jsx"; // ✅ if you have it

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(50);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { serverURL } = useContext(AuthDataContext) || { serverURL: "http://localhost:8000" };

  // ✅ Fetch cart data from backend or localStorage
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${serverURL}/api/cart/get`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setCart(res.data.items || []);
        setSubtotal(res.data.totalAmount || 0);
      } catch (error) {
        console.log("Cart Fetch Error:", error);
      }
    };

    fetchCart();
  }, [serverURL]);

  const totalAmount = subtotal + deliveryFee;

  // ✅ Place order API call
  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      setMessage("Please enter delivery address");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${serverURL}/api/order/placeOrder`,
        {
          items: cart,
          amount: totalAmount,
          address,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setMessage(res.data.message || "Order placed successfully!");
      setCart([]);
      setAddress("");

      // Optional redirect after 2s
      setTimeout(() => navigate("/orders"), 2000);
    } catch (error) {
      console.error("Order Error:", error);
      setMessage(error.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Checkout</h2>

        <div className="border-b pb-4 mb-4">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
                <p>₹{item.price * item.qty}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          )}
        </div>

        <div className="mb-4 space-y-1 text-sm text-gray-700">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Delivery Fee: ₹{deliveryFee}</p>
          <p className="font-semibold text-lg mt-2">Total: ₹{totalAmount}</p>
        </div>

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter delivery address"
          className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
          required
        />

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-medium transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("Failed") ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
