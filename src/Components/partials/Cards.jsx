import React from "react";
import { Link } from "react-router-dom";
import noimage from "/public/no_image.webp"
import Loading from "../Loading"
const Cards = ({data, title}) => {
    return data?(
        <div className=" flex flex-wrap w-full h-full px-[5%] bg-[#1F1E24] ">
            {data.map((c,i)=>(
                <Link to={`/${c.media_type || title}/details/${c.id}`} className="relative w-[25vh]  block mr-[5%] mb-[5%] group cursor-pointer
                     hover:-translate-y-3
                     transition-all duration-300 ease-in-out" key={i}>
                    <img className=" shadow-[8px_17px_38px_2px_rgba(0,0,1,0.5)] w-full h-[40vh] object-cover group-hover:scale-110
                         transition-all duration-500 ease-in-out" 
                        src={
                            c.poster_path || c.backdrop_path || c.profile_path?
                            `https://image.tmdb.org/t/p/w500${
                            c.poster_path || c.backdrop_path || c.profile_path
                        }`:(
                            noimage
                        )} 
                        alt="" 
                    />
                    <h1 className="text-zinc-300 text-2xl  mt-3 font-semibold group-hover:text-white group-hover:translate-x-1
                       transition-all duration-300">
                        {c.name || 
                        c.title|| 
                        c.original_title || 
                        c.original_name}
                    </h1>
                    {c.vote_average != null && c.vote_average > 0 && (
                        <div className="absolute right-[-10%] bottom-[25%] rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center group-hover:scale-125 group-hover:bg-yellow-500
                         transition-all duration-300">
                            {(c.vote_average*10).toFixed()} <sup>%</sup>
                        </div>
                    )}
                        

                </Link>
            ))}
        </div>
    ):(
        <Loading/>
    );
};

export default Cards;
