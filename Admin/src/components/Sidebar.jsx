import React, { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaListOl } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-300 p-4 shadow-md transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Dashboard</h2>
        <ul className="space-y-2 text-gray-600 font-medium">
          <li
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer transition"
            onClick={() => {
              navigate("/Add");
              setIsOpen(false);
            }}
          >
            <IoAddCircleOutline size={20} /> Add Items
          </li>
          <li
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer transition"
            onClick={() => {
              navigate("/List");
              setIsOpen(false);
            }}
          >
            <FaListOl size={20} /> List Items
          </li>
          <li
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer transition"
            onClick={() => {
              navigate("/Orders");
              setIsOpen(false);
            }}
          >
            <TiTick size={20} /> Orders
          </li>
        </ul>
      </aside>

      {/* Floating 3-dot button (bottom-left, only on small screens) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 left-4 z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
      >
        {isOpen ? <IoClose size={22} /> : <HiOutlineDotsHorizontal size={22} />}
      </button>

      {/* Overlay (dark background when sidebar open on mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
