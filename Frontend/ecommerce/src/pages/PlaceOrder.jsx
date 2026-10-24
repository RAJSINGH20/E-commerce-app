import React, { useContext, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthDataContext.jsx";
import { ShopDataContext } from "../context/ShopDataContext.jsx";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { serverURL } = useContext(AuthDataContext);
  const {
    products,
    cartitem,
    setcartitem,
    deliveryfees,
    productsLoading,
    productsError,
    cartLoading,
    cartError,
  } = useContext(ShopDataContext);

  const cart = useMemo(
    () => Object.entries(cartitem).flatMap(([productId, sizes]) => {
      const product = products.find((item) => item._id === productId);
      if (!product) return [];

      return Object.entries(sizes)
        .filter(([, quantity]) => quantity > 0)
        .map(([size, quantity]) => ({ ...product, size, quantity }));
    }),
    [cartitem, products]
  );
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalAmount = subtotal + deliveryfees;
  const isCartLoading = cartLoading || productsLoading;
  const loadError = cartError || productsError;

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      setMessage("Please enter delivery address");
      return;
    }

    if (!cart.length) {
      setMessage("Your cart is empty.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${serverURL}/api/order/placeOrder`,
        {
          items: cart,
          amount: totalAmount,
          address,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setMessage(res.data.message || "Order placed successfully!");
      setcartitem({});
      setAddress("");
      setTimeout(() => navigate("/Order"), 2000);
    } catch (error) {
      console.error("Order Error:", error);
      setMessage(error.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-paper px-4 py-8 sm:px-7 sm:py-12 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <p className="animate-enter mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-coral">OneCart / Checkout</p>
        <h1 className="animate-enter font-display text-3xl font-semibold text-ink sm:text-4xl">Almost yours.</h1>
        <p className="mt-2 text-sm text-gray-500">Add your delivery details to place the order.</p>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="animate-enter border border-rule bg-white p-5 sm:p-7">
            <div className="mb-6 border-b border-rule pb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-forest">Delivery</p>
              <h2 className="mt-1 font-display text-xl font-semibold text-ink">Where should we send it?</h2>
            </div>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
              Delivery address
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House number, street, city, state and postal code"
                className="min-h-36 w-full resize-y border border-rule bg-paper/60 px-4 py-3 text-sm font-normal leading-6 text-ink placeholder:text-gray-400 outline-none transition focus:border-forest focus:bg-white focus:ring-4 focus:ring-forest/10"
                rows={4}
                required
              />
            </label>
            {message && (
              <p role="status" className={`mt-4 border-l-2 px-3 py-2 text-sm ${message.includes("Failed") || message.includes("Please") ? "border-coral bg-[#fff6f2] text-[#a84832]" : "border-forest bg-paper text-forest"}`}>
                {message}
              </p>
            )}
          </section>

          <aside className="animate-enter-late border border-rule bg-white p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-coral">Your order</p>
            <h2 className="mb-5 mt-1 font-display text-xl font-semibold text-ink">Order summary</h2>

            <div className="max-h-64 divide-y divide-rule overflow-y-auto border-y border-rule">
              {isCartLoading ? (
                <p className="py-5 text-sm text-gray-500">Loading your cart...</p>
              ) : loadError ? (
                <p role="alert" className="py-5 text-sm text-[#a84832]">{loadError}</p>
              ) : cart.length > 0 ? (
                cart.map((item) => (
                  <div key={`${item._id}-${item.size}`} className="flex items-center justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                      <p className="mt-1 text-xs text-gray-500">Size: {item.size} · Qty: {item.quantity}</p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-ink">₹{item.price * item.quantity}</p>
                  </div>
                ))
              ) : (
                <p className="py-5 text-sm text-gray-500">Your cart is empty.</p>
              )}
            </div>

            <div className="space-y-3 border-b border-rule py-5 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between text-gray-600"><span>Delivery fee</span><span>₹{deliveryfees}</span></div>
            </div>
            <div className="flex justify-between py-5 font-display text-base font-semibold text-ink"><span>Total</span><span>₹{totalAmount}</span></div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={loading || isCartLoading || Boolean(loadError) || cart.length === 0}
              className="min-h-12 w-full bg-forest px-4 text-xs font-bold uppercase tracking-[0.1em] text-leaf transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
            >
              {loading ? "Placing order..." : "Place order"}
            </button>
            <p className="mt-4 text-center text-[10px] leading-5 text-gray-500">Your order is protected with secure checkout.</p>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
