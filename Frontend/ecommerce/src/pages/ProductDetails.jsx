// ProductDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopDataContext } from "../context/ShopDataContext.jsx";
import Title from "../Components/Tittle";
import Card from "../Components/Card";

const ProductDetails = () => {
  const { productId } = useParams();
  const { products, currency, addtocart } = useContext(ShopDataContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [sizes, setSizes] = useState([]); // available sizes
  const [selectedSize, setSelectedSize] = useState(null); // chosen size
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.image);
        setImage1(foundProduct.image1);
        setImage2(foundProduct.image2);
        setImage3(foundProduct.image3);
        setSizes(foundProduct.size || []);
        setActiveImage(foundProduct.image);
        setSelectedSize(null); // reset selection
      }
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="animate-enter px-5 py-28 text-center font-display text-xl font-semibold text-gray-500">No product found.</div>;
  }

  return (
    <main className="min-h-screen bg-paper px-4 py-8 sm:px-7 sm:py-12 lg:px-10">
      <div className="mx-auto max-w-[1360px]">
        <p className="animate-enter mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-coral">OneCart / Product details</p>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-14">
          <div className="animate-enter grid grid-cols-1 gap-3 sm:grid-cols-[76px_minmax(0,1fr)] sm:items-start">
            <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col">
              {[image, image1, image2, image3].filter(Boolean).map((img, index) => (
                <button key={index} type="button" aria-label={`View product image ${index + 1}`} aria-pressed={activeImage === img} className={`h-[72px] w-[64px] shrink-0 overflow-hidden border transition sm:h-[82px] sm:w-[72px] ${activeImage === img ? "border-forest ring-2 ring-forest/10" : "border-rule opacity-70 hover:opacity-100"}`} onClick={() => setActiveImage(img)}>
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <img
              src={activeImage}
              alt={productData.name}
              className="order-1 aspect-[4/5] max-h-[720px] w-full bg-gray-100 object-cover sm:order-2"
            />
          </div>

          <div className="animate-enter-late flex flex-col items-start gap-5 lg:sticky lg:top-24 lg:pt-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-forest">{productData.category}</p>
            <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">{productData.name}</h1>
            <p className="max-w-xl text-sm leading-7 text-gray-600">{productData.description}</p>
            <p className="border-y border-rule py-4 font-display text-2xl font-semibold text-ink">
              {currency} {productData.price}
            </p>

            {Array.isArray(sizes) && sizes.length > 0 && (
              <div className="w-full">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-ink">Select size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-pressed={selectedSize === s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-h-11 min-w-12 border px-4 text-xs font-bold transition ${
                        selectedSize === s ? "border-forest bg-forest text-leaf" : "border-rule bg-white text-ink/70 hover:border-forest hover:text-forest"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              className="mt-2 min-h-12 w-full bg-forest px-6 text-xs font-bold uppercase tracking-[0.12em] text-leaf shadow-[0_12px_26px_rgba(36,73,54,0.16)] transition hover:-translate-y-0.5 hover:bg-ink sm:max-w-sm"
              onClick={() => {
                addtocart(productData._id, selectedSize);
              }}
            >
              Add to bag <span aria-hidden="true" className="ml-2">→</span>
            </button>
            <p className="text-xs text-gray-500">Complimentary delivery on orders above ₹999.</p>
          </div>
        </div>

        <section className="mt-20 border-t border-rule pt-10">
          <Title text1="Related" text2="Products" />
          <div className="product-grid mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {products
              .filter((item) => item.category === productData.category && item._id !== productId)
              .slice(0, 4)
              .map((item, index) => (
                <Card key={index} name={item.name} image={item.image} id={item._id} price={item.price} />
              ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
