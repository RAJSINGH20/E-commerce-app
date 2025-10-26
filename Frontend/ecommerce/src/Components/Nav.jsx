import React from "react";
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";

const Navbar = ({ userdata, onLogout }) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setShowSearch(false);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="flex items-center justify-between px-8 py-3 bg-[#e7f1ef] shadow-md">
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
            alt="logo"
            className="w-6 h-6"
          />
          <div className="text-xl font-semibold text-gray-700">OneCart</div>
        </div>

        {/* Middle - Links */}
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

        {/* Right - Icons */}
        <div className="flex items-center gap-4 text-gray-700 text-xl relative">
          {/* Search */}
          <div
            className="cursor-pointer hover:text-gray-900"
            onClick={toggleSearch}
          >
            <FaSearch />
          </div>

          {/* Profile */}
          {!userdata ? (
            <div
              className="cursor-pointer hover:text-gray-900"
              onClick={toggleDropdown}
            >
              <FaUserCircle />
            </div>
          ) : (
            <div
              className="cursor-pointer hover:text-gray-900 bg-gray-800 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm"
              onClick={toggleDropdown}
            >
              {userdata?.name
                ? userdata.name.slice(0, 1).toUpperCase()
                : userdata?.username
                ? userdata.username.slice(0, 1).toUpperCase()
                : ""}
            </div>
          )}

          {/* Cart */}
          <div className="relative cursor-pointer hover:text-gray-900">
            <FaShoppingCart />
            <div className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
              0
            </div>
          </div>
        </div>
      </div>

      {/* Search Panel */}
      {showSearch && (
        <div className="absolute right-12 top-16 bg-white border border-gray-300 rounded-xl shadow-md p-4 w-64">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="flex-1 outline-none px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400"
            />
            <div
              className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm cursor-pointer hover:bg-gray-900"
              onClick={() => alert(`Searching for: ${searchValue}`)}
            >
              Go
            </div>
          </div>
        </div>
      )}

      {/* Profile Dropdown */}
      {showDropdown && (
        <div className="absolute right-12 top-16 bg-white border border-gray-300 rounded-xl shadow-md p-3 w-40">
          <div
            className="text-gray-800 text-sm py-2 px-3 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={onLogout}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
