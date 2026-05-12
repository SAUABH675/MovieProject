import React from "react";
import { Link } from "react-router-dom";
import noimage from "/public/no_image.webp";
import Loading from "../Loading";

const Cards = ({ data, title }) => {
  return data ? (
    <div
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
      className="grid gap-3 w-full px-4 sm:px-[5%] bg-[#1F1E24] pb-10 pt-2"
    >
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative block group cursor-pointer hover:-translate-y-2 transition-transform duration-300 ease-in-out"
          key={i}
        >
          {/* Poster */}
          <div className="overflow-hidden rounded-lg">
            <img
              className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-500"
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/w500${
                      c.poster_path || c.backdrop_path || c.profile_path
                    }`
                  : noimage
              }
              alt={c.name || c.title || ""}
            />
          </div>

          {/* Title */}
          <h1 className="text-zinc-400 text-xs mt-2 font-semibold truncate group-hover:text-white transition-colors duration-300">
            {c.name || c.title || c.original_title || c.original_name}
          </h1>

          {/* Rating Badge */}
          {c.vote_average != null && c.vote_average > 0 && (
            <div className="absolute -right-2 bottom-7 rounded-full text-[10px] font-bold bg-yellow-600 text-white w-8 h-8 flex flex-col justify-center items-center leading-none group-hover:scale-125 transition-transform duration-300">
              <span>{(c.vote_average * 10).toFixed()}</span>
              <sup className="text-[7px]">%</sup>
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
