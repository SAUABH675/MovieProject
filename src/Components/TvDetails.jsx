import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/TvActions";
import { useNavigate, useParams, Link, useLocation, Outlet } from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import providerSearchLinks from "../Utils/providerSearchLinks";
import Loading from "./Loading";
import noimage from "/no_image.webp";

const ImdbSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="24" viewBox="0 0 64 32">
    <g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4" /></g>
    <g transform="translate(8,7)" fill="#000" fillRule="nonzero">
      <polygon points="0 18 5 18 5 0 0 0" />
      <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z" />
      <path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z" />
      <path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z" />
    </g>
  </svg>
);

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const info = useSelector((state) => state.tv.info);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => dispatch(removetv());
  }, [id]);

  const title = info?.detail?.title || info?.detail?.original_title || info?.detail?.name;

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-full min-h-screen px-4 sm:px-8 md:px-[10%] pb-10 overflow-y-auto"
    >
      {/* Nav */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-3 sm:gap-5 text-xl">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full hover:bg-[#6556CD] flex items-center justify-center transition-all duration-300 cursor-pointer">
          <i className="ri-arrow-left-line text-lg" />
        </button>
        <Link to="/home" className="w-8 h-8 rounded-full hover:bg-[#6556CD] flex items-center justify-center transition-all duration-300">
          <i className="ri-home-line text-lg" />
        </Link>
        {info.detail.homepage && (
          <a className="w-8 h-8 rounded-full hover:bg-[#6556CD] flex items-center justify-center transition-all duration-300" target="_blank" rel="noreferrer" href={info.detail.homepage}>
            <i className="ri-external-link-line" />
          </a>
        )}
        {info.externalid?.wikidata_id && (
          <a className="w-8 h-8 rounded-full hover:bg-[#6556CD] flex items-center justify-center transition-all duration-300" target="_blank" rel="noreferrer" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
            <i className="ri-global-fill" />
          </a>
        )}
        {info.externalid?.imdb_id && (
          <a target="_blank" rel="noreferrer" href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}>
            <ImdbSvg />
          </a>
        )}
      </nav>

      {/* Poster + Details */}
      <div className="w-full flex flex-col md:flex-row gap-8 md:gap-0">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-full sm:w-[60%] md:w-auto md:h-[50vh] object-cover rounded-lg mx-auto md:mx-0"
          src={`https://image.tmdb.org/t/p/original${info.detail.poster_path || info.detail.backdrop_path}`}
          alt={title}
        />
        <div className="content md:ml-[5%] text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">
            {info.detail.name || info.detail.title || info.detail.original_title || info.detail.original_name}
            <small className="text-lg sm:text-2xl font-bold text-zinc-300 ml-2">
              ({info.detail.first_air_date ? info.detail.first_air_date.split("-")[0] : "N/A"})
            </small>
          </h1>
          <div className="mt-3 mb-5 flex flex-wrap text-white items-center gap-x-3 gap-y-2">
            <span className="rounded-full text-base font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()}<sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-xl leading-6">User Score</h1>
            <h1 className="text-sm sm:text-base">{info.detail.first_air_date}</h1>
            <h1 className="text-sm sm:text-base">{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1 className="text-sm sm:text-base">{info.detail.runtime}min</h1>
          </div>
          <h1 className="text-lg sm:text-2xl font-semibold italic text-zinc-200">{info.detail.tagline}</h1>
          <h1 className="text-xl sm:text-2xl mb-3 mt-5">Overview</h1>
          <p className="text-sm sm:text-base">{info.detail.overview}</p>
          <h1 className="text-xl sm:text-2xl mb-3 mt-5">TV Translated</h1>
          <p className="mb-10 text-sm sm:text-base">{info.translations.join(", ")}</p>
          <Link className="p-4 sm:p-5 bg-[#6556CD] rounded-lg text-sm sm:text-base" to={`${pathname}/trailer`}>
            <i className="text-lg sm:text-xl ri-play-fill mr-3"></i>Play Trailer
          </Link>
        </div>
      </div>

      {/* Watch Providers */}
      <div className="w-full md:w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders?.flatrate && (
          <div className="flex flex-wrap gap-4 items-center text-white">
            <h1 className="text-sm font-semibold">Available on Platform</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <a key={i} href={providerSearchLinks[w.provider_name] ? providerSearchLinks[w.provider_name](title) : info.watchproviders.link} target="_blank" rel="noreferrer" title={w.provider_name}>
                <img className="w-[5vh] h-[5vh] object-cover rounded-md hover:scale-110 transition-all duration-300" src={`https://image.tmdb.org/t/p/original${w.logo_path}`} alt={w.provider_name} />
              </a>
            ))}
          </div>
        )}
        {info.watchproviders?.rent && (
          <div className="flex flex-wrap gap-4 items-center text-white">
            <h1 className="text-sm font-semibold">Available on Rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <a key={i} href={providerSearchLinks[w.provider_name] ? providerSearchLinks[w.provider_name](title) : info.watchproviders.link} target="_blank" rel="noreferrer" title={w.provider_name}>
                <img className="w-[5vh] h-[5vh] object-cover rounded-md hover:scale-110 transition-all duration-300" src={`https://image.tmdb.org/t/p/original${w.logo_path}`} alt={w.provider_name} />
              </a>
            ))}
          </div>
        )}
        {info.watchproviders?.buy && (
          <div className="flex flex-wrap gap-4 items-center text-white">
            <h1 className="text-sm font-semibold">Available to Buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <a key={i} href={providerSearchLinks[w.provider_name] ? providerSearchLinks[w.provider_name](title) : info.watchproviders.link} target="_blank" rel="noreferrer" title={w.provider_name}>
                <img className="w-[5vh] h-[5vh] object-cover rounded-md hover:scale-110 transition-all duration-300" src={`https://image.tmdb.org/t/p/original${w.logo_path}`} alt={w.provider_name} />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Seasons */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-2xl sm:text-3xl font-bold text-white">Seasons</h1>
      <div className="w-full flex overflow-x-auto overflow-y-hidden mb-5 p-5 gap-5">
        {info.detail.seasons.length > 0 ? (
          info.detail.seasons.map((s, i) => (
            <Link to={`/tv/details/${id}/season/${s.season_number}`} key={i} className="min-w-[120px] max-w-[120px] sm:min-w-[150px] sm:max-w-[150px] hover:scale-105 transition-all duration-300">
              <img
                className="h-[20vh] sm:h-[25vh] w-full object-cover rounded-md shadow-lg"
                src={s.poster_path ? `https://image.tmdb.org/t/p/w500${s.poster_path}` : noimage}
                alt={s.name}
              />
              <h1 className="text-zinc-300 text-xs sm:text-sm mt-3 font-semibold truncate w-full" title={s.name}>
                {s.name}
              </h1>
            </Link>
          ))
        ) : (
          <h1 className="text-3xl mt-5 text-white font-black text-center">Nothing to show</h1>
        )}
      </div>

      {/* Recommendations */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-2xl sm:text-3xl font-bold text-white">Recommendations & Similar Stuff</h1>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} media_type="tv" />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
