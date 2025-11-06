import React, { useContext } from 'react';
import Nav from '../components/Nav.jsx';
import Sidebar from '../components/Sidebar.jsx';
import upload from '../assets/upload.jpg';
import axios from 'axios';
import { AuthDataContext } from '../Context/AuthCountext.jsx'; // ✅ make sure path is correct

const Add = () => {
  // ✅ All useStates at top (Hooks cannot be inside JSX)
  const [image, setImage] = React.useState("");
  const [image1, setImage1] = React.useState("");
  const [image2, setImage2] = React.useState("");
  const [image3, setImage3] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [subcategory, setSubcategory] = React.useState("");
  const [bestseller, setBestseller] = React.useState(false);
  const [size, setSize] = React.useState(""); // ✅ single selected size
  const [stock, setStock] = React.useState("");
  const serverURL = "http://localhost:8000" // ✅ assuming serverURL is constant

  const toggleSize = (sz) => {
    setSize((prev) =>
      prev.includes(sz) ? prev.filter((s) => s !== sz) : [...prev, sz]
    );
  };
  // ✅ handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formdata = new FormData();
      formdata.append("image", image);
      formdata.append("image1", image1);
      formdata.append("image2", image2);
      formdata.append("image3", image3);
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("category", category);
      formdata.append("price", price);
      formdata.append("subcategory", subcategory);
      formdata.append("bestseller", bestseller);
      formdata.append("size", JSON.stringify(["S", "L", "XXL"]));
      formdata.append("stock", stock);

      let result = await axios.post(`${serverURL}/api/product/addproduct`, formdata, {
        withCredentials: true,
      });

      if (result.status === 201 || result.status === 200) {
        console.log("✅ Product added successfully:", result.data);

        // reset fields
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setSubcategory("");
        setBestseller(false);
        setSize("");
        setStock("");
        setImage(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
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
              <label className="font-medium text-gray-700">Product Category</label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2 sm:p-3 mt-1 w-full focus:ring-2 focus:ring-lime-500 outline-none"
              >
                <option value="" hidden>
                  select
                </option>
                <option value="MEN">MEN</option>
                <option value="WOMEN">WOMEN</option>
                <option value="KIDS">KIDS</option>
              </select>
            </div>

            {/* Subcategory */}
            <div>
              <label className="font-medium text-gray-700">Product SUB-Category</label>
              <select
                required
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2 sm:p-3 mt-1 w-full focus:ring-2 focus:ring-lime-500 outline-none"
              >
                <option value="" hidden>
                  select
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
                {["S", "M", "L", "XL", "XXL"].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => toggleSize(sz)} // ✅ use toggle instead of setSize
                    className={`border rounded-md py-2 text-sm sm:text-base transition-all ${size.includes(sz)
                        ? "bg-lime-600 text-white border-lime-700"
                        : "bg-white text-gray-700 hover:bg-lime-100"
                      }`}
                  >
                    {sz}
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
                {/* Image 1 */}
                <label htmlFor="image" className="cursor-pointer flex flex-col items-center">
                  <img
                    src={!image ? upload : URL.createObjectURL(image)}
                    alt="upload"
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-md mb-2 border"
                  />
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    accept="image/*"
                    required
                    onChange={(event) => setImage(event.target.files[0])}
                  />
                  <span className="text-blue-500 text-xs sm:text-sm">Choose File</span>
                </label>

                {/* Image 2 */}
                <label htmlFor="image1" className="cursor-pointer flex flex-col items-center">
                  <img
                    src={!image1 ? upload : URL.createObjectURL(image1)}
                    alt="upload"
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-md mb-2 border"
                  />
                  <input
                    type="file"
                    id="image1"
                    className="hidden"
                    accept="image/*"
                    required
                    onChange={(event) => setImage1(event.target.files[0])}
                  />
                  <span className="text-blue-500 text-xs sm:text-sm">Choose File</span>
                </label>

                {/* Image 3 */}
                <label htmlFor="image2" className="cursor-pointer flex flex-col items-center">
                  <img
                    src={!image2 ? upload : URL.createObjectURL(image2)}
                    alt="upload"
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-md mb-2 border"
                  />
                  <input
                    type="file"
                    id="image2"
                    className="hidden"
                    accept="image/*"
                    required
                    onChange={(event) => setImage2(event.target.files[0])}
                  />
                  <span className="text-blue-500 text-xs sm:text-sm">Choose File</span>
                </label>

                {/* Image 4 */}
                <label htmlFor="image3" className="cursor-pointer flex flex-col items-center">
                  <img
                    src={!image3 ? upload : URL.createObjectURL(image3)}
                    alt="upload"
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-md mb-2 border"
                  />
                  <input
                    type="file"
                    id="image3"
                    className="hidden"
                    accept="image/*"
                    required
                    onChange={(event) => setImage3(event.target.files[0])}
                  />
                  <span className="text-blue-500 text-xs sm:text-sm">Choose File</span>
                </label>
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
