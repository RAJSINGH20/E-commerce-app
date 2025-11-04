import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const serverURL = "http://localhost:8000";

  const fetchList = async () => {
    try {
      const response = await axios.get(`${serverURL}/api/product/GetProducts`, {
        withCredentials: true,
      });
      setList(response.data);
    } catch (err) {
      console.error("Error fetching product list:", err);
      setError("Failed to fetch product list.");
    } finally {
      setLoading(false);
    }
  };

  const removelist = async (id) => {
    try {
      let result = await axios.get(`${serverURL}/api/product/removeproduct/${id}`, {
        withCredentials: true,
      });
      console.log(result)
      if (result.data) {
        fetchList(); // Refresh the list after deletion
      } else {
        console.log("Deletion failed");
      }
    } catch (err) {
      console.error("Error removing product:", err);
      setError("Failed to remove product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* ✅ Navbar stays fixed on top */}
      <Nav />

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* ✅ Sidebar (collapses below Nav on small screens) */}
        <div className="lg:w-1/5 w-full border-b lg:border-b-0 lg:border-r bg-white">
          <Sidebar />
        </div>

        {/* ✅ Main content area */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-auto">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Product List</h1>

          {/* Loading & Error States */}
          {loading ? (
            <p className="text-gray-600">Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : list.length === 0 ? (
            <p className="text-gray-600">No products available.</p>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full text-sm sm:text-base">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                      Image
                    </th>
                    <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                      Product Name
                    </th>
                    <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                      Description
                    </th>
                    <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                      Price
                    </th>
                    <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                      </td>
                      <td className="p-3 font-medium">{product.name}</td>
                      <td className="p-3 text-gray-600">{product.description}</td>
                      <td className="p-3 font-semibold text-gray-800">
                        ₹{product.price}
                      </td>
                      <td className="p-3">
                        <button
                          className="text-red-500 hover:text-red-700 font-medium"
                          onClick={() => removelist(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
