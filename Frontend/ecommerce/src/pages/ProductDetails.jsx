import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopDataContext } from "../context/ShopContanier";
import Title from "../Components/Tittle";
import Card from "../Components/Card";

const ProductDetails = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopDataContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState(false);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [size, setSize] = useState(false);
  const [activeImage, setActiveImage] = useState(false);

  // 🔍 Fetch product based on productId
  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.image);
        setImage1(foundProduct.image1);
        setImage2(foundProduct.image2);
        setImage3(foundProduct.image3);
        setSize(foundProduct.size || []);
        setActiveImage(foundProduct.image);
      }
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="text-center text-gray-500 py-20">No product found.</div>;
  }

  return (
    <div className="w-full bg-gray-50 py-10 px-5 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* ✅ Title */}
        <Title text1="Product" text2="Details" />

        {/* ✅ Product Info Section */}
        <div className="flex flex-col lg:flex-row gap-10 mt-10">
          {/* 🖼️ Left: Product Images */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <img
              src={activeImage}
              alt={productData.name}
              className="w-80 h-80 sm:w-96 sm:h-96 object-cover rounded-xl shadow-md"
            />

            {/* Thumbnails */}
            <div className="flex gap-3 mt-2">
              {[image, image1, image2, image3]
                .filter(Boolean)
                .map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`thumb-${index}`}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                      activeImage === img ? "border-blue-500" : "border-gray-300"
                    }`}
                    onClick={() => setActiveImage(img)}
                  />
                ))}
            </div>
          </div>

          {/* 📋 Right: Product Details */}
          <div className="flex flex-col justify-start gap-4 max-w-lg">
            <h2 className="text-3xl font-semibold">{productData.name}</h2>
            <p className="text-gray-600 leading-relaxed">{productData.description}</p>

            <p className="text-2xl font-bold">
              {currency}
              {productData.price}
            </p>

            {/* Size Selection */}
            {Array.isArray(size) && size.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Select Size:</h3>
                <div className="flex gap-2 flex-wrap">
                  {size.map((s, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(s)}
                      className={`border px-4 py-2 rounded-lg transition ${
                        size === s
                          ? "bg-blue-500 text-white border-blue-600"
                          : "border-gray-400 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart (placeholder) */}
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        </div>

        {/* ✅ Related Products Section (Optional) */}
        <div className="mt-16">
          <Title text1="Related" text2="Products" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {products
              .filter((item) => item.category === productData.category && item._id !== productId)
              .slice(0, 4)
              .map((item, index) => (
                <Card
                  key={index}
                  name={item.name}
                  image={item.image}
                  id={item._id}
                  price={item.price}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
