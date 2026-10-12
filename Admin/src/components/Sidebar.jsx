import { useState } from "react";
import { FiBox, FiGrid, FiMenu, FiPlus, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const links = [
    { label: "Overview", path: "/" },
    { label: "Product list", path: "/list" },
  ];

  return (
    <>
      <aside
        className={`fixed inset-y-[72px] left-0 z-40 flex w-[min(82vw,280px)] flex-col border-r border-rule bg-white px-4 py-6 transition-transform duration-300 md:w-64 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Admin navigation"
      >
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-forest/45">Workspace</p>
        <nav className="space-y-1" aria-label="Workspace">
          {links.map(({ label, path }) => {
            const isActive = location.pathname.toLowerCase() === path;
            return (
              <button
                key={path}
                type="button"
                onClick={() => {
                  navigate(path);
                  setIsOpen(false);
                }}
                aria-current={isActive ? "page" : undefined}
                className={`group flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold transition ${isActive ? "bg-forest text-white shadow-[0_8px_18px_rgba(36,73,54,0.16)]" : "text-ink/65 hover:bg-paper hover:text-ink"}`}
              >
                {path === "/" ? (
                  <FiGrid className={`text-lg ${isActive ? "text-leaf" : "text-forest/55 group-hover:text-forest"}`} aria-hidden="true" />
                ) : (
                  <FiBox className={`text-lg ${isActive ? "text-leaf" : "text-forest/55 group-hover:text-forest"}`} aria-hidden="true" />
                )}
                {label}
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-leaf" />}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl bg-paper p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-leaf text-forest">
            <FiPlus aria-hidden="true" />
          </div>
          <p className="font-display text-sm font-semibold text-ink">Keep the catalog fresh</p>
          <p className="mt-1 text-xs leading-5 text-ink/55">Add new arrivals and keep product details up to date.</p>
        </div>
      </aside>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        className="fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-white shadow-[0_10px_28px_rgba(23,37,29,0.25)] transition hover:scale-105 hover:bg-ink md:hidden"
      >
        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-ink/30 backdrop-blur-[2px] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
