import React, { useContext, useEffect, useState } from "react";
import Title from "../Components/Tittle";
import { ShopDataContext } from "../context/ShopContanier";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    products,
    currency,
    deliveryfees,
    cartitem,
    setcartitem,
    updatequantity,
  } = useContext(ShopDataContext);

  const [cartdata, setcartdata] = useState([]);
  const navigate = useNavigate();

  // ✅ Build cart item details based on cartitem object
  useEffect(() => {
    const tempdata = [];
    for (const productId in cartitem) {
      for (const size in cartitem[productId]) {
        if (cartitem[productId][size] > 0) {
          const product = products.find((p) => p._id === productId);
          if (product) {
            tempdata.push({
              ...product,
              size: size,
              quantity: cartitem[productId][size],
            });
          }
        }
      }
    }
    setcartdata(tempdata);
  }, [cartitem, products]);

  // ✅ Calculate subtotal
  const subtotal = cartdata.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + deliveryfees;

  // ✅ Quantity update handlers
  const increaseQty = (id, size) => {
    updatequantity(id, size, cartitem[id][size] + 1);
  };

  const decreaseQty = (id, size) => {
    if (cartitem[id][size] > 1) {
      updatequantity(id, size, cartitem[id][size] - 1);
    } else {
      // If 1 -> remove
      const updatedCart = { ...cartitem };
      delete updatedCart[id][size];
      setcartitem(updatedCart);
    }
  };

  return (
    <div className="p-6 md:p-10">
      {/* Page Title */}
      <Title text1={"YOUR"} text2={"CART"} />

      {/* Cart Items */}
      {cartdata.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">
          Your cart is empty 🛒
        </div>
      ) : (
        <div className="mt-8 grid gap-6">
          {cartdata.map((item) => (
            <div
              key={`${item._id}-${item.size}`}
              className="flex flex-col md:flex-row items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">
                    Price: {currency}
                    {item.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => decreaseQty(item._id, item.size)}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item._id, item.size)}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <p className="font-semibold mt-4 md:mt-0">
                {currency}
                {item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Cart Summary */}
      {cartdata.length > 0 && (
        <div className="mt-10 border-t pt-6 max-w-md ml-auto">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal:</span>
            <span>
              {currency}
              {subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Delivery Fee:</span>
            <span>
              {currency}
              {deliveryfees.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total:</span>
            <span>
              {currency}
              {total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
          >
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
