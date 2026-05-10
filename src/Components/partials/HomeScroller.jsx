import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HomeScroller = ({ data, title = "all" }) => {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setCurrent(0);
  }, [data]);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 5000);
  };

  useEffect(() => {
    if (!data || data.length === 0) return;
    resetTimer();
    return () => clearTimeout(timeoutRef.current);
  }, [current, data]);

  const handleNext = () => {
    setAnimate(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % data.length);
      setAnimate(true);
    }, 300);
  };

  const handlePrev = () => {
    setAnimate(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + data.length) % data.length);
      setAnimate(true);
    }, 300);
  };

  const handleDot = (i) => {
    setAnimate(false);
    setTimeout(() => {
      setCurrent(i);
      setAnimate(true);
    }, 300);
  };

  if (!data || data.length === 0) return null;
  const item = data[current];
  if (!item) return null;

  return (
    <>
      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes bgZoom {
          from { transform: scale(1.08); }
          to   { transform: scale(1); }
        }
        .anim-badge   { animation: scaleIn     0.4s ease forwards; }
        .anim-title   { animation: fadeSlideLeft 0.5s ease 0.15s both; }
        .anim-meta    { animation: fadeSlideUp  0.5s ease 0.3s  both; }
        .anim-overview{ animation: fadeSlideUp  0.5s ease 0.45s both; }
        .anim-buttons { animation: fadeSlideUp  0.5s ease 0.6s  both; }
        .anim-bg      { animation: bgZoom       6s   ease forwards; }
      `}</style>

      <div className="relative w-full h-[75vh] overflow-hidden">

        {/* Animated background */}
        <div
          key={current}
          className="anim-bg absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${
              item.backdrop_path || item.poster_path || ""
            })`,
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Content — only renders when animate is true */}
        {animate && (
          <div className="relative z-10 h-full flex items-center px-[8%]">
            <div className="w-[55%] flex flex-col gap-4">

              {/* Badge */}
              <div className="anim-badge flex items-center gap-3">
                <span className="bg-[#6556CD] text-white text-xs px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">
                  {item.media_type || title}
                </span>
                {item.adult === false && (
                  <span className="border border-green-500 text-green-400 text-xs px-3 py-1 rounded-full">
                    All Ages
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="anim-title text-white text-5xl font-black leading-tight drop-shadow-2xl">
                {item.name || item.title || item.original_title || item.original_name}
              </h1>

              {/* Meta info */}
              <div className="anim-meta flex flex-wrap items-center gap-3">
                {item.vote_average > 0 && (
                  <div className="flex items-center gap-1.5 bg-yellow-500/20 border border-yellow-500/40 px-3 py-1.5 rounded-full">
                    <i className="ri-star-fill text-yellow-400 text-sm" />
                    <span className="text-yellow-300 font-bold text-sm">
                      {(item.vote_average * 10).toFixed()}%
                    </span>
                  </div>
                )}
                {item.vote_count > 0 && (
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                    <i className="ri-user-fill text-zinc-400 text-sm" />
                    <span className="text-zinc-300 text-sm">
                      {item.vote_count.toLocaleString()} votes
                    </span>
                  </div>
                )}
                {(item.release_date || item.first_air_date) && (
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                    <i className="ri-calendar-line text-zinc-400 text-sm" />
                    <span className="text-zinc-300 text-sm">
                      {(item.release_date || item.first_air_date).split("-")[0]}
                    </span>
                  </div>
                )}
                {item.original_language && (
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                    <i className="ri-translate-2 text-zinc-400 text-sm" />
                    <span className="text-zinc-300 text-sm uppercase">
                      {item.original_language}
                    </span>
                  </div>
                )}
              </div>

              {/* Overview */}
              {item.overview && (
                <p className="anim-overview text-zinc-300 text-sm leading-relaxed line-clamp-3 max-w-[90%]">
                  {item.overview}
                </p>
              )}

              {/* Buttons */}
              <div className="anim-buttons flex gap-4 mt-2">
                <Link
                  to={`/${item.media_type || title}/details/${item.id}`}
                  className="bg-[#6556CD] hover:bg-[#7c6de0] text-white px-7 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 hover:scale-105"
                >
                  <i className="ri-play-fill text-lg" /> Watch Now
                </Link>
                <Link
                  to={`/${item.media_type || title}/details/${item.id}`}
                  className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-7 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 hover:scale-105"
                >
                  <i className="ri-information-line text-lg" /> More Info
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* Left arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 
                     bg-black/40 hover:bg-[#6556CD] text-white 
                     w-11 h-11 rounded-full flex items-center justify-center 
                     transition-all duration-300 hover:scale-110 border border-white/20"
        >
          <i className="ri-arrow-left-s-line text-2xl" />
        </button>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 
                     bg-black/40 hover:bg-[#6556CD] text-white 
                     w-11 h-11 rounded-full flex items-center justify-center 
                     transition-all duration-300 hover:scale-110 border border-white/20"
        >
          <i className="ri-arrow-right-s-line text-2xl" />
        </button>

        

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-[#6556CD]"
                  : "w-2 bg-zinc-500 hover:bg-zinc-300"
              }`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute top-6 right-6 z-20 text-zinc-400 text-sm font-mono">
          <span className="text-white font-bold">{current + 1}</span>
          <span> / {data.length}</span>
        </div>

      </div>

      {/* Add progress keyframe globally */}
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </>
  );
};

export default HomeScroller;
