import React from "react";
import { Link } from "react-router-dom";
import noimage from "/public/no_image.webp";
import Loading from "../Loading";

const Cards = ({ data, title }) => {
  return data ? (
    // ✅ Responsive grid: 2 cols mobile, 3 tablet, 4 desktop
    <div className="flex flex-wrap w-full h-full px-[3%] sm:px-[5%] bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[45%] sm:w-[28%] md:w-[20%] lg:w-[18%] block mr-[3%] sm:mr-[4%] md:mr-[5%] mb-[5%] group cursor-pointer
               hover:-translate-y-3 transition-all duration-300 ease-in-out"
          key={i}
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,1,0.5)] w-full h-[25vh] sm:h-[32vh] md:h-[40vh] object-cover
                 group-hover:scale-110 transition-all duration-500 ease-in-out rounded-md"
            src={
              c.poster_path || c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/w500${
                    c.poster_path || c.backdrop_path || c.profile_path
                  }`
                : noimage
            }
            alt=""
          />
          {/* ✅ Responsive title font */}
          <h1 className="text-zinc-300 text-sm sm:text-lg md:text-xl mt-2 font-semibold truncate
               group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
            {c.name || c.title || c.original_title || c.original_name}
          </h1>
          {c.vote_average != null && c.vote_average > 0 && (
            <div className="absolute right-[-5%] sm:right-[-8%] md:right-[-10%] bottom-[22%] rounded-full text-xs sm:text-base font-semibold bg-yellow-600 text-white w-[4vh] h-[4vh] sm:w-[5vh] sm:h-[5vh] flex justify-center items-center
                 group-hover:scale-125 group-hover:bg-yellow-500 transition-all duration-300">
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  ) : (
    <Loading />
  );
};

export default Cards;
