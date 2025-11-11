import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/Authcontext.jsx";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { serverURL } = useContext(AuthDataContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${serverURL}/api/order/getOrder`, {
          withCredentials: true,
        });
        console.log("Fetched Orders:", res.data);
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [serverURL]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No orders"
          className="w-32 mb-4 opacity-70"
        />
        <p className="text-lg text-gray-500">You have no orders yet.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        My Orders
      </h2>

      <div className="max-w-5xl mx-auto space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white hover:shadow-lg transition-shadow duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <div>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Order ID:</span> {order._id}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(order.date).toLocaleString("en-IN")}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status || "Pending"}
              </span>
            </div>

            {/* Summary */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-gray-700 mb-2">
                <strong>Total Amount:</strong>{" "}
                <span className="text-gray-900 font-semibold">
                  ₹{order.amount}
                </span>
              </p>
              <p className="text-gray-700 mb-6">
                <strong>Shipping Address:</strong> {order.address}
              </p>

              {/* Items */}
              <h4 className="font-semibold text-gray-800 mb-3">Items:</h4>
              <ul className="grid md:grid-cols-2 gap-4">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-gray-100 transition"
                  >
                    <img
                      src={
                        item.image ||
                        "https://cdn-icons-png.flaticon.com/512/679/679922.png"
                      }
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-gray-700 font-semibold mt-1">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button className="px-5 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
