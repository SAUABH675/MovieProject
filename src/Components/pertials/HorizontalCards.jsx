import React from "react";
import { Link } from "react-router-dom";
import noimage from "/public/no_image.webp";

const HorizontalCards = ({ data, media_type }) => {
  return (
    // ✅ overflow-x-auto for horizontal scroll
    <div className="w-full flex overflow-x-auto overflow-y-hidden mb-5 p-3 sm:p-5 gap-3 sm:gap-4">
      {data ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type || media_type || "movie"}/details/${d.id}`}
            key={i}
            // ✅ Responsive card widths
            className="min-w-[60%] sm:min-w-[40%] md:min-w-[25%] lg:min-w-[15%]
                       bg-zinc-900 rounded-md overflow-hidden cursor-pointer flex-shrink-0
                       hover:scale-105 hover:bg-zinc-700
                       hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]
                       transition-all duration-300 ease-in-out"
          >
            <img
              className="w-full h-[20vh] sm:h-[25vh] md:h-[30vh] object-cover transition-all duration-500"
              src={
                d.poster_path || d.backdrop_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.poster_path || d.backdrop_path
                    }`
                  : noimage
              }
              alt=""
            />
            <div className="text-white p-2 sm:p-3">
              <h1 className="text-sm sm:text-base md:text-lg font-semibold truncate">
                {d.name || d.title || d.original_title || d.original_name}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-2">
                {d.overview ? d.overview.slice(0, 80) : "No description"}...
                <span className="text-zinc-500"> more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-2xl sm:text-3xl text-white text-center font-black w-full">
          Nothing to show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
