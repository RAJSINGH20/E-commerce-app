import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/AuthDataContext.jsx";

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
      <div className="flex min-h-[70vh] items-center justify-center bg-paper">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-rule border-t-forest" role="status" aria-label="Loading orders" />
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-paper px-5 text-center">
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-leaf/55 text-2xl text-forest">○</span>
        <h1 className="font-display text-2xl font-semibold text-ink">No orders yet</h1>
        <p className="mt-2 text-sm text-gray-500">Your order history will appear here after checkout.</p>
      </div>
    );

  return (
    <main className="min-h-screen bg-paper px-4 py-8 sm:px-7 sm:py-12 lg:px-10">
      <header className="animate-enter mx-auto mb-8 max-w-[1180px] border-b border-rule pb-6">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-coral">OneCart / Account</p>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Your orders</h1>
        <p className="mt-2 text-sm text-gray-500">A record of the pieces on their way to you.</p>
      </header>

      <div className="mx-auto max-w-[1180px] divide-y divide-rule border-y border-rule bg-white">
        {orders.map((order) => (
          <div
            key={order._id}
            className="animate-enter px-4 py-5 sm:px-6 sm:py-7"
          >
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">Order reference</p>
                <p className="mt-1 break-all text-sm font-semibold text-ink">{order._id}</p>
                <p className="mt-1 text-xs text-gray-500">{new Date(order.date).toLocaleString("en-IN")}</p>
              </div>
              <span
                className={`w-fit px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] ${
                  order.status === "Delivered"
                    ? "bg-leaf/55 text-forest"
                    : order.status === "Cancelled"
                    ? "bg-[#fff0eb] text-[#a84832]"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order.status || "Pending"}
              </span>
            </div>

            <div className="grid gap-4 border-y border-rule py-4 sm:grid-cols-2">
              <p className="text-sm text-gray-600">
                <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">Order total</span>
                <span className="mt-1 inline-block font-display text-lg font-semibold text-ink">₹{order.amount}</span>
              </p>
              <p className="break-words text-sm text-gray-600">
                <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">Delivery address</span>
                <span className="mt-1 inline-block leading-6">{typeof order.address === "string" ? order.address : JSON.stringify(order.address)}</span>
              </p>
            </div>

              <div className="pt-5">
              <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-forest">Items in this order</h2>
              <ul className="divide-y divide-rule border-y border-rule">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 py-3 sm:gap-4"
                  >
                    <img
                      src={
                        item.image ||
                        "https://cdn-icons-png.flaticon.com/512/679/679922.png"
                      }
                      alt={item.name}
                      className="h-16 w-16 shrink-0 bg-gray-100 object-cover sm:h-20 sm:w-20"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                      <p className="mt-1 text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-ink">₹{item.price * item.quantity}</p>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
};

export default Orders;
