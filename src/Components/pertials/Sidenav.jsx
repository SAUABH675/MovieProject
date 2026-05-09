<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';

const sidenav = () => {
    
    return <>
        <div className='w-[20%]  h-full  border-r-2 border-zinc-400 p-10'>
            <h1 className='text-2xl text-white font-bold mr-2'>
                <i className="text-[#6556CD] ri-tv-fill "></i>
                <span className='text-2xl'>Movix</span>
                
            </h1>
            < nav className='flex flex-col gap-3 text-gray-400 text-xl'>
                <h1 className='text-white font-semibold text-xl mt-10 mb-5'>New Feeds</h1>

                <Link to="/trending" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-fire-fill"></i>Trending</Link>
                <Link to="/Popular" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-bard-fill"></i>Popular</Link>
                <Link to="/movie" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-movie-2-line"></i>Movies</Link>
                <Link to="/tv" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-tv-2-line"></i>TV Shows</Link>
                <Link to="/person" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-team-fill"></i>People</Link>
                

            </nav>
            <hr className='border-none h-[1px] bg-zinc-400'/>
            < nav className=' flex flex-col gap-3 text-gray-400 text-xl'>
                <h1 className='text-white font-semibold text-xl mt-10 mb-5'>Website Information</h1>

                
                <Link to="/about" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-information-fill"></i>About</Link>
                <Link to="/contactUs" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-phone-fill"></i>Contact Us</Link>
                

            </nav>
            
        </div>
    </>
};
export default sidenav;

=======
import React from 'react';
import { Link } from 'react-router-dom';

const sidenav = () => {
    
    return <>
        <div className='w-[20%]  h-full  border-r-2 border-zinc-400 p-10'>
            <h1 className='text-2xl text-white font-bold mr-2'>
                <i className="text-[#6556CD] ri-tv-fill "></i>
                <span className='text-2xl'>Movix</span>
                
            </h1>
            < nav className='flex flex-col gap-3 text-gray-400 text-xl'>
                <h1 className='text-white font-semibold text-xl mt-10 mb-5'>New Feeds</h1>

                <Link to="/trending" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-fire-fill"></i>Trending</Link>
                <Link to="/Popular" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-bard-fill"></i>Popular</Link>
                <Link to="/movie" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-movie-2-line"></i>Movies</Link>
                <Link to="/tv" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-tv-2-line"></i>TV Shows</Link>
                <Link to="/person" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-team-fill"></i>People</Link>
                

            </nav>
            <hr className='border-none h-[1px] bg-zinc-400'/>
            < nav className=' flex flex-col gap-3 text-gray-400 text-xl'>
                <h1 className='text-white font-semibold text-xl mt-10 mb-5'>Website Information</h1>

                
                <Link to="/about" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-information-fill"></i>About</Link>
                <Link to="/contactUs" className='hover:bg-[#6556CD] rounded-lg p-2 hover:text-white duration-300'><i className="mr-2 ri-phone-fill"></i>Contact Us</Link>
                

            </nav>
            
        </div>
    </>
};
export default sidenav;

>>>>>>> parent of 55ec2d9 (Project update)
