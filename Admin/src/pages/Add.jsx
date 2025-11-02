import React from "react";
import Nav from "../components/Nav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import upload from "../assets/upload.jpg";
import axios from "axios";
import { AuthDataContext } from "../Context/AuthCountext.jsx";

const Add = () => {
  const [Image, setImage] = React.useState(null);
  const [Image1, setImage1] = React.useState(null);
  const [Image2, setImage2] = React.useState(null);
  const [Image3, setImage3] = React.useState(null);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [subcategory, setSubcategory] = React.useState("");
  const [bestseller, setBestseller] = React.useState(false);
  const [selectedSizes, setSelectedSizes] = React.useState([]);
  const [stock, setStock] = React.useState("");
  const { serverURL } = "http://localhost:8000";

  // ✅ Handle size selection toggle
  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  // ✅ Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("Image", Image);
      formdata.append("Image1", Image1);
      formdata.append("Image2", Image2);
      formdata.append("Image3", Image3);
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("category", category);
      formdata.append("price", price);
      formdata.append("subcategory", subcategory);
      formdata.append("bestseller", bestseller);
      formdata.append("size", JSON.stringify(selectedSizes));
      formdata.append("stock", stock);

      console.log("Submitting product with data:", {
        name: formdata.get("name"),
        description: formdata.get("description"),
        category: formdata.get("category"),
        price: formdata.get("price"),
        subcategory: formdata.get("subcategory"),
        bestseller: formdata.get("bestseller"),
        size: formdata.get("size"),
        stock: formdata.get("stock"),
      });

      const result = await axios.post(
        `${serverURL}/api/product/AddProduct`,
        formdata,
        { withCredentials: true }
      );

      if (result.status === 201 || result.status === 200) {
        console.log("✅ Product added successfully:", result.data);

        // Reset form
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setSubcategory("");
        setBestseller(false);
        setSelectedSizes([]);
        setStock("");
        setImage(null);
        setImage1(null);
        setImage2(null);
        setImage3(null);
      } else {
        console.log("❌ Failed to add product:", result);
      }
    } catch (error) {
      console.error("⚠️ Error adding product:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-teal-900 to-lime-900">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <Nav />
        <div className="flex justify-center items-center py-10 px-4 sm:px-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl p-6 sm:p-8 rounded-xl shadow-xl flex flex-col gap-6"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 text-center">
              Add Product Page
            </h2>

            {/* Product Name */}
            <input
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md p-2 sm:p-3 focus:ring-2 focus:ring-lime-500 outline-none w-full"
            />

            {/* Product Description */}
            <textarea
              placeholder="Product Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md p-2 sm:p-3 focus:ring-2 focus:ring-lime-500 outline-none w-full h-24 sm:h-28 resize-none"
            />

            {/* Price + Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 rounded-md p-2 sm:p-3 focus:ring-2 focus:ring-lime-500 outline-none w-full"
              />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="border border-gray-300 rounded-md p-2 sm:p-3 focus:ring-2 focus:ring-lime-500 outline-none w-full"
              />
            </div>

            {/* Category */}
            <div>
              <label className="font-medium text-gray-700">
                Product Category
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2 sm:p-3 mt-1 w-full focus:ring-2 focus:ring-lime-500 outline-none"
              >
                <option value="" hidden>
                  Select
                </option>
                <option value="MEN">MEN</option>
                <option value="WOMEN">WOMEN</option>
                <option value="KIDS">KIDS</option>
              </select>
            </div>

            {/* Subcategory */}
            <div>
              <label className="font-medium text-gray-700">
                Product Subcategory
              </label>
              <select
                required
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2 sm:p-3 mt-1 w-full focus:ring-2 focus:ring-lime-500 outline-none"
              >
                <option value="" hidden>
                  Select
                </option>
                <option value="TOPWEAR">TOPWEAR</option>
                <option value="BOTTOMWEAR">BOTTOMWEAR</option>
                <option value="WINTERWEAR">WINTERWEAR</option>
              </select>
            </div>

            {/* Size Selector */}
            <div>
              <p className="font-medium text-gray-700 mb-2">Select Sizes</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`border rounded-md py-2 text-sm sm:text-base transition-all ${
                      selectedSizes.includes(size)
                        ? "bg-lime-600 text-white border-lime-700"
                        : "bg-white text-gray-700 hover:bg-lime-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Bestseller */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="bestseller"
                checked={bestseller}
                onChange={(e) => setBestseller(e.target.checked)}
                className="w-5 h-5 text-lime-600"
              />
              <label htmlFor="bestseller" className="ml-2 text-gray-700">
                Bestseller
              </label>
            </div>

            {/* Image Upload Section */}
            <div className="flex flex-col gap-4">
              <p className="font-medium text-gray-700 text-center sm:text-left">
                Upload Images
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 place-items-center">
                {[Image, Image1, Image2, Image3].map((img, i) => (
                  <label
                    key={i}
                    htmlFor={`image${i}`}
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <img
                      src={!img ? upload : URL.createObjectURL(img)}
                      alt="upload"
                      className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-md mb-2 border"
                    />
                    <input
                      type="file"
                      id={`image${i}`}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (i === 0) setImage(file);
                        if (i === 1) setImage1(file);
                        if (i === 2) setImage2(file);
                        if (i === 3) setImage3(file);
                      }}
                      required
                    />
                    <span className="text-blue-500 text-xs sm:text-sm">
                      Choose File
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-lime-600 text-white py-2 sm:py-3 rounded-md hover:bg-lime-700 transition text-sm sm:text-base"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
