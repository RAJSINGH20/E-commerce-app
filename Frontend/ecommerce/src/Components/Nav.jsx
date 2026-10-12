import React from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUserCircle,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";
import vcart_logo from "../assets/vcart_logo.png";
import { AuthDataContext } from "../context/AuthDataContext.jsx";
import { ShopDataContext } from "../context/ShopDataContext.jsx";

const Navbar = ({ onLogout }) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [showMenu, setShowMenu] = React.useState(false);

  const { serverURL } = React.useContext(AuthDataContext);
  const { getcartCount } = React.useContext(ShopDataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Collections", path: "/COLLECTIONS" },
    { label: "About", path: "/About" },
    { label: "Contact", path: "/Contact" },
  ];

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setShowSearch(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowSearch(false);
    setShowDropdown(false);
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        `${serverURL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("Logged out successfully!");
        if (onLogout) onLogout();
        navigate("/login");
      } else {
        alert("Logout failed!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error while logging out. Try again!");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-7 lg:px-10">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="OneCart home">
          <img src={vcart_logo} alt="" className="h-10 w-10 rounded-xl object-cover" />
          <span className="font-display text-lg font-semibold text-ink">OneCart<span className="ml-1 text-coral">.</span></span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map(({ label, path }) => {
            const active = location.pathname.toLowerCase() === path.toLowerCase();
            return (
              <Link key={path} to={path} className={`relative px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition ${active ? "text-forest" : "text-ink/55 hover:text-ink"}`}>
                {label}
                {active && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-coral" />}
              </Link>
            );
          })}
        </nav>

        <div className="relative flex shrink-0 items-center gap-1 text-ink">
          <button type="button" aria-label="Search products" title="Search products" onClick={toggleSearch} className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white hover:text-forest">
            <FaSearch className="text-sm" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Account menu" title="Account" onClick={toggleDropdown} className="hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-white hover:text-forest sm:flex">
            <FaUserCircle className="text-lg" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Your orders" title="Your orders" onClick={() => navigate("/Order")} className="hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-white hover:text-forest sm:flex">
            <BsFillBagCheckFill className="text-base" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Shopping cart" title="Shopping cart" onClick={() => navigate("/cart")} className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white hover:text-forest">
            <FaShoppingCart className="text-base" aria-hidden="true" />
            <span className="absolute right-0.5 top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-leaf px-1 text-[9px] font-bold text-ink">{getcartCount()}</span>
          </button>
          <button type="button" aria-label={showMenu ? "Close navigation" : "Open navigation"} aria-expanded={showMenu} onClick={toggleMenu} className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white hover:text-forest md:hidden">
            {showMenu ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>

      {showMenu && (
        <nav className="animate-slideDown border-t border-rule bg-paper px-4 py-3 md:hidden" aria-label="Mobile navigation">
          {navItems.map(({ label, path }) => (
            <Link key={path} to={path} className="block border-b border-rule/70 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ink/70 last:border-0" onClick={() => setShowMenu(false)}>{label}</Link>
          ))}
          <button type="button" onClick={() => { navigate("/Order"); setShowMenu(false); }} className="block w-full border-b border-rule/70 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-ink/70">Your orders</button>
          <button type="button" onClick={() => { toggleDropdown(); setShowMenu(false); }} className="block w-full py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-ink/70">Account</button>
        </nav>
      )}

      {showSearch && (
        <div className="animate-fadeIn absolute right-4 top-[calc(100%+10px)] z-50 w-[min(92vw,380px)] border border-rule bg-white p-3 shadow-[0_18px_50px_rgba(23,37,29,0.14)] sm:right-8">
          <form className="flex items-center gap-2" onSubmit={(event) => { event.preventDefault(); alert(`Searching for: ${searchValue}`); }}>
            <input type="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search products..." className="min-h-11 min-w-0 flex-1 border border-rule bg-paper px-3 text-sm outline-none focus:border-forest" />
            <button type="submit" className="min-h-11 bg-forest px-4 text-xs font-bold uppercase tracking-[0.1em] text-leaf transition hover:bg-ink">Search</button>
          </form>
        </div>
      )}

      {showDropdown && (
        <div className="animate-fadeIn absolute right-16 top-[calc(100%+8px)] z-50 min-w-40 border border-rule bg-white p-2 shadow-[0_18px_50px_rgba(23,37,29,0.14)]">
          <button type="button" className="w-full px-3 py-2.5 text-left text-sm font-semibold text-ink/70 transition hover:bg-paper hover:text-ink" onClick={logout}>Log out</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
