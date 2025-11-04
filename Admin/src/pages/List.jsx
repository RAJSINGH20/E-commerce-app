import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const server = "http://localhost:8000";

  const fetchList = async () => {
    try {
      const response = await axios.get(`${server}/api/product/GetProducts`, {
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
      let result = await axios.delete(`${server}/api/product/removeproduct/${id}`, {
        withCredentials: true,
      });
      if (result.data) {
        fetchList(); // Refresh the list after deletion
      }else{
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
      {/* ✅ Navbar stays on top always */}
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
                      Product Name
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
                      <td className="p-3">{product.name}</td>
                      <td className="p-3">₹{product.price}</td>
                      <td className="p-3 space-x-2 sm:space-x-3">
                        <button className="text-blue-500 hover:text-blue-700 font-medium">
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-700 font-medium" onClick={()=>{ removelist(product._id)}}>
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
