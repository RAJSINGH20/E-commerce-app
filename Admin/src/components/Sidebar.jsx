import React from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { FaListOl } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';



const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gray-100 border-r border-gray-300 p-4 shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Sidebar</h2>
      <ul className="space-y-2">
        <li className="py-2 px-3 rounded hover:bg-gray-200 cursor-pointer" onClick={()=>{navigate("/Add")}} ><IoAddCircleOutline /> Add Items</li>
        <li className="py-2 px-3 rounded hover:bg-gray-200 cursor-pointer" onClick={()=>{navigate("/List")}} ><FaListOl /> List Items</li>
        <li className="py-2 px-3 rounded hover:bg-gray-200 cursor-pointer" onClick={()=>{navigate("/Orders")}} ><TiTick /> Orders</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
