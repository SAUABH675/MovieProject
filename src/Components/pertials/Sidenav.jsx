import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/authSlice";

const Sidenav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleAuthClick = () => {
    if (user) dispatch(logout());
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger - mobile only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-[200] w-10 h-10 bg-[#6556CD] rounded-lg flex items-center justify-center text-white text-xl shadow-lg"
      >
        <i className={isOpen ? "ri-close-line" : "ri-menu-line"} />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-[150]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidenav */}
      <div
        className={`
          fixed md:sticky md:top-0
          top-0 left-0
          h-screen
          w-[70%] sm:w-[50%] md:w-[20%]
          border-r-2 border-zinc-700
          flex flex-col justify-between
          bg-[#1F1E24]
          overflow-hidden
          z-[160] md:z-auto
          transition-transform duration-300 ease-in-out
          flex-shrink-0
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Top section */}
        <div className="p-6 md:p-8 flex flex-col gap-1 overflow-y-auto">
          {/* Logo */}
          <h1 className="text-2xl text-white font-bold mb-8 mt-12 md:mt-0">
            <i className="text-[#6556CD] ri-tv-fill" />
            <span> Movix</span>
          </h1>

          {/* New Feeds */}
          <h2 className="text-white font-semibold text-base mb-2">New Feeds</h2>
          <nav className="flex flex-col gap-1 text-gray-400 text-lg">
            {[
              { to: "/trending", icon: "ri-fire-fill",    label: "Trending" },
              { to: "/popular",  icon: "ri-bard-fill",    label: "Popular" },
              { to: "/movie",    icon: "ri-movie-2-line", label: "Movies" },
              { to: "/tv",       icon: "ri-tv-2-line",    label: "TV Shows" },
              { to: "/person",   icon: "ri-team-fill",    label: "People" },
            ].map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className="hover:bg-[#6556CD] rounded-lg px-3 py-2 hover:text-white duration-300 flex items-center gap-2"
              >
                <i className={icon} />
                {label}
              </Link>
            ))}
          </nav>

          <hr className="border-none h-[1px] bg-zinc-700 my-4" />

          {/* Website Info */}
          <h2 className="text-white font-semibold text-base mb-2">Website Information</h2>
          <nav className="flex flex-col gap-1 text-gray-400 text-lg">
            {[
              { to: "/about",     icon: "ri-information-fill", label: "About" },
              { to: "/contactUs", icon: "ri-phone-fill",       label: "Contact Us" },
            ].map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className="hover:bg-[#6556CD] rounded-lg px-3 py-2 hover:text-white duration-300 flex items-center gap-2"
              >
                <i className={icon} />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom: Login/Logout */}
        <div className="p-6 md:p-8 border-t border-zinc-700">
          <button
            onClick={handleAuthClick}
            className={`w-full flex items-center gap-3 rounded-lg p-2.5 text-base font-medium transition-all duration-300 cursor-pointer ${
              user
                ? "text-gray-400 hover:text-white hover:bg-[#6556CD]"
                : "text-gray-400 hover:bg-[#7c6de0] hover:text-white"
            }`}
          >
            {user ? (
              <>
                {user.avatarUrl ? (
                  <img
                    src={`http://localhost:5000${user.avatarUrl}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-red-400/40 flex-shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#6556CD] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="overflow-hidden flex-1 text-left">
                  <p className="text-gray-400 text-sm font-semibold truncate">{user.name}</p>
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <i className="ri-logout-box-line" /> Click to logout
                  </p>
                </div>
              </>
            ) : (
              <>
                <i className="ri-account-circle-line text-xl" />
                Login
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
