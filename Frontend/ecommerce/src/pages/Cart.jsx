import React, { useContext, useEffect, useState } from "react";
import Title from "../Components/Tittle";
import { ShopDataContext } from "../context/ShopDataContext.jsx";
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
    <main className="min-h-[70vh] bg-paper px-4 py-8 sm:px-7 sm:py-12 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <p className="animate-enter mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-coral">OneCart / Shopping bag</p>
        <Title text1="Your" text2="Cart" />

        {cartdata.length === 0 ? (
          <div className="animate-enter mx-auto flex max-w-xl flex-col items-center border-y border-rule px-5 py-16 text-center">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-leaf/55 text-2xl text-forest">○</span>
            <h2 className="font-display text-xl font-semibold text-ink">Your bag is waiting</h2>
            <p className="mt-2 text-sm text-gray-500">Explore the collection and find something you love.</p>
            <button type="button" onClick={() => navigate("/COLLECTIONS")} className="mt-6 min-h-11 bg-forest px-5 text-xs font-bold uppercase tracking-[0.1em] text-leaf transition hover:bg-ink">Explore collection</button>
          </div>
        ) : (
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <section className="divide-y divide-rule border-y border-rule bg-white" aria-label="Cart items">
              {cartdata.map((item) => (
                <article key={`${item._id}-${item.size}`} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
                  <img src={item.image} alt={item.name} className="aspect-[4/5] w-24 shrink-0 bg-gray-100 object-cover sm:w-20" />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-display text-base font-semibold text-ink">{item.name}</h3>
                    <p className="mt-1 text-xs text-gray-500">Size: {item.size}</p>
                    <p className="mt-2 text-sm font-medium text-forest">{currency} {item.price}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-start">
                    <div className="flex h-10 items-center border border-rule">
                      <button type="button" aria-label={`Decrease quantity of ${item.name}`} onClick={() => decreaseQty(item._id, item.size)} className="h-10 w-10 text-ink/60 transition hover:bg-paper hover:text-ink">−</button>
                      <span className="w-8 text-center text-sm font-semibold text-ink">{item.quantity}</span>
                      <button type="button" aria-label={`Increase quantity of ${item.name}`} onClick={() => increaseQty(item._id, item.size)} className="h-10 w-10 text-ink/60 transition hover:bg-paper hover:text-ink">+</button>
                    </div>
                    <p className="min-w-20 text-right text-sm font-bold text-ink">{currency} {item.price * item.quantity}</p>
                  </div>
                </article>
              ))}
            </section>

            <aside className="border border-rule bg-white p-5 sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-coral">Your total</p>
              <h2 className="mb-6 mt-1 font-display text-xl font-semibold text-ink">Order summary</h2>
              <div className="space-y-3 border-b border-rule pb-5 text-sm">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{currency} {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Delivery fee</span><span>{currency} {deliveryfees.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between py-5 font-display text-base font-semibold text-ink"><span>Total</span><span>{currency} {total.toFixed(2)}</span></div>
              <button type="button" onClick={() => navigate("/PlaceOrder")} className="group flex min-h-12 w-full items-center justify-center gap-2 bg-forest px-4 text-xs font-bold uppercase tracking-[0.1em] text-leaf transition hover:bg-ink">Continue to checkout <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></button>
              <p className="mt-4 text-center text-[10px] leading-5 text-gray-500">Shipping and taxes are calculated at checkout.</p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
