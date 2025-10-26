import React from "react";
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import assest from "../assets/vcart_logo.png";
import { userdataContext } from "../context/Usercontext";

const Navbar = () => {
    let {userdata} = React.useContext(userdataContext);
  return (
    <div className="flex items-center justify-between px-8 py-3 bg-[#e7f1ef] shadow-md">
      
      {/* Left Side - Logo */}
      <div className="flex items-center gap-2">
        <img
          src={assest}
          alt="logo"
          className="w-6 h-6"
        />
        <div className="text-xl font-semibold text-gray-700">OneCart</div>
      </div>

      {/* Middle - Nav Links */}
      <div className="flex gap-4">
        <div className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-900">
          HOME
        </div>
        <div className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-900">
          COLLECTIONS
        </div>
        <div className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-900">
          ABOUT
        </div>
        <div className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-900">
          CONTACT
        </div>
      </div>

      {/* Right Side - Icons */}
      <div className="flex items-center gap-4 text-gray-700 text-xl">
        <div className="cursor-pointer hover:text-gray-900">
          <FaSearch />
        </div>
        {!userdata ? (
          <div className="cursor-pointer hover:text-gray-900">
            <FaUserCircle />
          </div>
        ) : (<div className="cursor-pointer hover:text-gray-900">
           {userdata.name.slice(0,1).toUpperCase()} 
        </div>)}
        <div className="relative cursor-pointer hover:text-gray-900">
          <FaShoppingCart />
          <div className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
            0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
