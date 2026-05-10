import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/MovieActions";
import {
  useNavigate,
  useParams,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import providerSearchLinks from "../Utils/providerSearchLinks";
import Loading from "./Loading";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const info = useSelector((state) => state.movie.info);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id, dispatch]);
  // console.log(info.watchproviders);

  const title =
    info?.detail?.title || info?.detail?.original_title || info?.detail?.name;

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[170vh] px-[10%]"
    >
      {/* part 1 navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></button>
        <a target="_blank" href={info.detail.homepage}>
          <i className=" ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-global-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          <svg
            id="home_img"
            className="ipc-logo"
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="32"
            viewBox="0 0 64 32"
            version="1.1"
          >
            <g fill="#F5C518">
              <rect x="0" y="0" width="100%" height="100%" rx="4"></rect>
            </g>
            <g
              transform="translate(8.000000, 7.000000)"
              fill="#000000"
              fillRule="nonzero"
            >
              <polygon points="0 18 5 18 5 0 0 0"></polygon>
              <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path>
              <path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path>
              <path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path>
            </g>
          </svg>
        </a>
      </nav>

      {/* part2 Poster and details */}
      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[50vh] object-cover"
          src={`https://image.tmdb.org/t/p/original${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />
        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl font-black ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_title ||
              info.detail.original_name}
            <small className="text-2xl font-bold text-zinc-300">
              ({info.detail.release_date.split("-")[0] || "N/A"})
            </small>
          </h1>
          <div className="mt-3 mb-5 flex text-white items-center gap-x-3">
            <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-6">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>
          <h1 className="text-2xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>
          <h1 className="text-2xl mb-3 mt-5">Overview</h1>
          <p>{info.detail.overview}</p>
          <h1 className="text-2xl mb-3 mt-5">Movie Translated</h1>
          <p className=" mb-10">{info.translations.join(", ")}</p>
          <Link
            className="p-5 bg-[#6556CD] rounded-lg"
            to={`${pathname}/trailer`}
          >
            <i className="text-xl ri-play-fill mr-3"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Part3 Available on Platform */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <a
                key={i}
                href={
                  providerSearchLinks[w.provider_name]
                    ? providerSearchLinks[w.provider_name](title)
                    : info.watchproviders.link
                }
                target="_blank"
                rel="noreferrer"
                title={w.provider_name}
              >
                <img
                  className="w-[5vh] h-[5vh] object-cover rounded-md hover:scale-110 transition-all duration-300"
                  src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                  alt={w.provider_name}
                />
              </a>
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <a
                key={i}
                href={
                  providerSearchLinks[w.provider_name]
                    ? providerSearchLinks[w.provider_name](title)
                    : info.watchproviders.link
                }
                target="_blank"
                rel="noreferrer"
                title={w.provider_name}
              >
                <img
                  className="w-[5vh] h-[5vh] object-cover rounded-md hover:scale-110 transition-all duration-300"
                  src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                  alt={w.provider_name}
                />
              </a>
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <a
                key={i}
                href={
                  providerSearchLinks[w.provider_name]
                    ? providerSearchLinks[w.provider_name](title)
                    : info.watchproviders.link
                }
                target="_blank"
                rel="noreferrer"
                title={w.provider_name}
              >
                <img
                  className="w-[5vh] h-[5vh] object-cover rounded-md hover:scale-110 transition-all duration-300"
                  src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                  alt={w.provider_name}
                />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* part 4 Recommendation and similar stuff */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className=" text-3xl font-bold text-white">
        Recommendations & Similar Stuff
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
        media_type="movie"
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
