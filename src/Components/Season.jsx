import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../Utils/axios";
import Loading from "./Loading";

const Season = () => {
  const { id, seasonid } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchSeason = async () => {
      try {
        const { data } = await axios.get(`/tv/${id}/season/${seasonid}`);
        setInfo(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchSeason();
  }, [id, seasonid]);

  return info ? (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-[#1F1E24] overflow-y-auto px-4 sm:px-8 md:px-[10%] py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full hover:bg-[#6556CD] flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
        >
          <i className="ri-arrow-left-line text-lg" />
        </button>
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black">
          {info.name}
          <small className="text-zinc-400 text-base sm:text-xl font-bold ml-3">
            ({info.air_date?.split("-")[0]})
          </small>
        </h1>
      </div>

      {/* Episodes */}
      <div className="flex flex-col gap-y-4">
        {info.episodes.length > 0 ? (
          info.episodes.map((ep, i) => (
            <div key={i} className="w-full flex flex-col sm:flex-row gap-4 bg-zinc-900 rounded-lg overflow-hidden">
              <img
                className="w-full sm:w-[25%] md:w-[20%] h-[20vh] sm:h-[15vh] object-cover flex-shrink-0"
                src={ep.still_path ? `https://image.tmdb.org/t/p/w500${ep.still_path}` : "/public/no_image.webp"}
                alt={ep.name}
              />
              <div className="text-white p-3 sm:py-3 sm:pr-3 flex flex-col justify-center">
                <h1 className="text-base sm:text-xl font-semibold">
                  {ep.episode_number}. {ep.name}
                </h1>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                  {ep.overview ? ep.overview.slice(0, 150) : "No overview available"}...
                </p>
                <p className="text-zinc-500 text-xs sm:text-sm mt-2">
                  Air Date: {ep.air_date || "N/A"} | Rating: {(ep.vote_average * 10).toFixed()}%
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-white text-3xl font-black text-center">No Episodes Found</h1>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Season;
