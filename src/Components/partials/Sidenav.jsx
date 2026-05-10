import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/reducers/authSlice';

const Sidenav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleAuthClick = () => {
    if (user) {
      dispatch(logout());
    }
    navigate('/login');
  };

  return (
    <div className='w-[20%] h-full border-r-2 border-zinc-400 p-10 flex flex-col justify-between overflow-hidden'>
      <div>
        {/* Logo */}
        <h1 className='text-2xl text-white font-bold mr-2 mb-10'>
          <i className="text-[#6556CD] ri-tv-fill" />
          <span className='text-2xl'> Movix</span>
        </h1>

        {/* New Feeds */}
        <nav className='flex flex-col gap-2 text-gray-400 text-xl'>
          <h1 className='text-white font-semibold text-xl mb-5'>New Feeds</h1>
          <Link to="/trending" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-fire-fill" />Trending</Link>
          <Link to="/Popular"  className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-bard-fill" />Popular</Link>
          <Link to="/movie"    className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-movie-2-line" />Movies</Link>
          <Link to="/tv"       className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-tv-2-line" />TV Shows</Link>
          <Link to="/person"   className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-team-fill" />People</Link>
        </nav>

        <hr className='border-none h-[1px] bg-zinc-400 my-6' />

        {/* Website Info */}
        <nav className='flex flex-col gap-2 text-gray-400 text-xl'>
          <h1 className='text-white font-semibold text-xl mb-5'>Website Information</h1>
          <Link to="/about"     className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-information-fill" />About</Link>
          <Link to="/contactUs" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-phone-fill" />Contact Us</Link>
        </nav>
      </div>
      <div >

        
        {/* Single button: shows avatar+name when logged in, Login when logged out */}
<button
  onClick={handleAuthClick}
  className={`w-full flex items-center gap-3 rounded-lg p-2.5 text-base font-medium transition-all duration-300 cursor-pointer ${
    user
      ? 'text-gray-400 tex-xl hover:text-white hover:bg-[#6556CD]'
      : 'text-gray-400 text-xl hover:bg-[#7c6de0] hover:text-white'
  }`}
>
  {user ? (
    <>
      {/* Avatar */}
      {user.avatarUrl ? (
        <img
          src={`http://localhost:5000${user.avatarUrl}`}
          alt={user.name}
          className='w-8 h-8 rounded-full object-cover border-2 border-red-400/40 flex-shrink-0'
        />
      ) : (
        <div className='w-8 h-8 rounded-full bg-[#6556CD] flex items-center justify-center text-white font-bold text-sm flex-shrink-0'>
          {user.name?.charAt(0).toUpperCase()}
        </div>
      )}
      {/* Name + logout label */}
      <div className='overflow-hidden flex-1 text-left'>
        <p className='text-gray-400 text-sm font-semibold truncate'>{user.name}</p>
        <p className='text-red-400 text-xs flex items-center gap-1'>
          <i className='ri-logout-box-line' /> Click to logout
        </p>
      </div>
    </>
  ) : (
    <>
      <i className='ri-account-circle-line' />
      Login
    </>
  )}
</button>
      </div>
    </div>
  );
};

export default Sidenav;
