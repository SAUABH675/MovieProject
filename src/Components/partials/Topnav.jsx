import React, { useState, useEffect, useRef } from "react";
import axios from "../../Utils/axios";
import no_image from "/no_image.webp";
import { Link} from "react-router-dom";
const Topnav = () => {
  const [query, setquery]       = useState("");
  const [searches, setsearches] = useState([]);
  const inputRef = useRef(null);

  const GetSerches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    GetSerches();
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative flex mx-auto items-center justify-between">

      {/* Search */}
      <div className="relative flex items-center w-[70%]">
        <i
          onClick={() => inputRef.current.focus()}
          className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xl cursor-pointer hover:text-white transition-all duration-300"
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for movie, Tv show....."
          className="w-full bg-transparent border border-zinc-600 rounded-lg pl-10 pr-10 py-2 text-white outline-none"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        {query.length > 0 && (
          <i
            onClick={() => setquery("")}
            className="ri-close-line absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-2xl cursor-pointer hover:text-white transition-all duration-300"
          />
        )}
      </div>

     
        

      {/* Search results dropdown */}
      <div className="z-[100] absolute w-[70%] max-h-[50vh] bg-zinc-200 top-[100%] left-0 overflow-auto rounded-b-lg">
        {searches && query.length > 0 &&
          searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              onClick={() => setquery("")}
              className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 p-5 w-full flex justify-start items-center border-b-2 border-zinc-200"
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
                src={
                  s.poster_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${s.poster_path || s.profile_path}`
                    : no_image
                }
                alt=""
              />
              <span>{s.name || s.title || s.original_title || s.original_name}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Topnav;
