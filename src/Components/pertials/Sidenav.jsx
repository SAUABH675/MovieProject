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
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-[200] w-10 h-10 bg-[#6556CD] rounded-lg flex items-center justify-center text-white text-xl"
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

      {/*
        ✅ KEY FIXES:
        1. h-screen on BOTH mobile and desktop (removed md:h-auto)
        2. overflow-hidden — NO scrolling at all
        3. md:sticky md:top-0 — locks to viewport on desktop
        4. flex flex-col justify-between — top links + bottom login button
      */}
      <div
        className={`
          fixed md:sticky md:top-0
          top-0 left-0
          h-screen
          w-[70%] sm:w-[50%] md:w-[20%]
          border-r-2 border-zinc-700
          p-6 md:p-8
          flex flex-col justify-between
          bg-[#1F1E24]
          overflow-hidden
          z-[160] md:z-auto
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* ✅ TOP SECTION */}
        <div>
          {/* Logo */}
          <h1 className="text-2xl text-white font-bold mb-8 mt-12 md:mt-0">
            <i className="text-[#6556CD] ri-tv-fill" />
            <span> Movix</span>
          </h1>

          {/* New Feeds */}
          <nav className="flex flex-col gap-2 text-gray-400 text-lg">
            <h1 className="text-white font-semibold text-base mb-3">New Feeds</h1>
            <Link to="/trending" onClick={() => setIsOpen(false)}
              className="hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300">
              <i className="mr-2 ri-fire-fill" />Trending
            </Link>
            <Link to="/popular" onClick={() => setIsOpen(false)}
              className="hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300">
              <i className="mr-2 ri-bard-fill" />Popular
            </Link>
            <Link to="/movie" onClick={() => setIsOpen(false)}
              className="hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300">
              <i className="mr-2 ri-movie-2-line" />Movies
            </Link>
            <Link to="/tv" onClick={() => setIsOpen(false)}
              className="hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300">
              <i className="mr-2 ri-tv-2-line" />TV Shows
            </Link>
            <Link to="/person" onClick={() => setIsOpen(false)}
              className="hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300">
              <i className="mr-2 ri-team-fill" />People
            </Link>
          </nav>

          <hr className="border-none h-[1px] bg-zinc-700 my-5" />

          {/* Website Info */}
          <nav className="flex flex-col gap-2 text-gray-400 text-lg">
            <h1 className="text-white font-semibold text-base mb-3">Website Information</h1>
            <Link to="/about" onClick={() => setIsOpen(false)}
              className="hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300">
              <i className="mr-2 ri-information-fill" />About
            </Link>
            <Link to="/contactUs" onClick={() => setIsOpen(false)}
              className="hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300">
              <i className="mr-2 ri-phone-fill" />Contact Us
            </Link>
          </nav>
        </div>

        {/* ✅ BOTTOM SECTION - Login/Logout outside nav, pushed to bottom by justify-between */}
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
    </>
  );
};

export default Sidenav;
