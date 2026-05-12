import React from "react";
import { Link } from "react-router-dom";
import noimage from "/no_image.webp";
import Loading from "../Loading";

const Cards = ({ data, title }) => {
  return data ? (
    <div className="flex flex-wrap w-full px-3 sm:px-[5%] bg-[#1F1E24] pb-10">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[45%] sm:w-[28%] md:w-[20%] lg:w-[18%]
                     mr-[4%] mb-[5%] block group cursor-pointer
                     hover:-translate-y-3 transition-all duration-300 ease-in-out"
          key={i}
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-full
                       h-[22vh] sm:h-[30vh] md:h-[38vh] object-cover
                       group-hover:scale-105 transition-all duration-500 rounded-md"
            src={
              c.poster_path || c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/w500${c.poster_path || c.backdrop_path || c.profile_path}`
                : noimage
            }
            alt={c.name || c.title || ""}
          />
          <h1 className="text-zinc-300 text-xs sm:text-sm md:text-base mt-2 font-semibold truncate group-hover:text-white transition-all duration-300">
            {c.name || c.title || c.original_title || c.original_name}
          </h1>
          {c.vote_average != null && c.vote_average > 0 && (
            <div className="absolute right-[-8%] bottom-[20%] rounded-full text-xs font-semibold bg-yellow-600 text-white w-[4vh] h-[4vh] sm:w-[5vh] sm:h-[5vh] flex justify-center items-center group-hover:scale-125 transition-all duration-300">
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
