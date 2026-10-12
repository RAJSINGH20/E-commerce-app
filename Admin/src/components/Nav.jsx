import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import vcart_logo from '../assets/vcart_logo.png';
import axios from 'axios';
import { FiLogOut } from 'react-icons/fi';
import { AuthDataContext } from '../Context/AuthDataContext.jsx';

const Nav = () => {
  const navigate = useNavigate();
  const { serverURL } = useContext(AuthDataContext);

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${serverURL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex h-[72px] items-center justify-between border-b border-rule bg-paper/95 px-4 backdrop-blur-xl sm:px-7 lg:px-9">
      <div
        className="flex cursor-pointer items-center gap-3"
        onClick={() => navigate("/")}
      >
        <img src={vcart_logo} alt="VCart" className="h-10 w-10 rounded-xl object-cover" />
        <div>
          <h1 className="font-display text-lg font-semibold leading-none tracking-normal text-ink">VCart</h1>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-forest/65">Operations</p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden items-center gap-2 border-r border-rule pr-5 sm:flex">
          <span className="h-2 w-2 rounded-full bg-[#8dbd37] shadow-[0_0_0_4px_rgba(141,189,55,0.14)]" />
          <span className="text-xs font-semibold text-forest">Store is live</span>
        </div>
      <button
        type="button"
        onClick={logoutHandler}
        className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-rule bg-white px-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-coral/40 hover:bg-[#fff7f4] hover:text-[#b94e37] sm:px-4"
      >
        <FiLogOut className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        <span>Log out</span>
      </button>
      </div>
    </nav>
  );
};

export default Nav;
