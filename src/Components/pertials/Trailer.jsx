import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notfound from "../Notfound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className="bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center px-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6556CD] text-3xl text-white right-4 sm:right-[5%] top-4 sm:top-[5%] cursor-pointer"
      >
        <i className="ri-close-fill" />
      </button>
      {ytvideo ? (
        <div className="w-full max-w-[1300px] aspect-video">
          <ReactPlayer
            controls
            width="100%"
            height="100%"
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          />
        </div>
      ) : (
        <Notfound />
      )}
    </div>
  );
};

export default Trailer;
