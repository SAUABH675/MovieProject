import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/PersonAction";
import { useNavigate, useParams, Link } from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";
import Dropdown from "./partials/Dropdown";

const PersonDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const info = useSelector((state) => state.person.info);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => dispatch(removeperson());
  }, [id]);

  return info ? (
    <div className="px-4 sm:px-8 md:px-[10%] w-full min-h-screen bg-[#1F1E24] overflow-y-auto pb-10">
      {/* Nav */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-5 text-xl">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full hover:bg-[#6556CD] flex items-center justify-center transition-all duration-300 cursor-pointer">
          <i className="ri-arrow-left-line text-lg" />
        </button>
        <Link to="/home" className="w-8 h-8 rounded-full hover:bg-[#6556CD] flex items-center justify-center transition-all duration-300">
          <i className="ri-home-line text-lg" />
        </Link>
      </nav>

      {/* ✅ Stack on mobile, side-by-side on md+ */}
      <div className="w-full flex flex-col md:flex-row gap-8">
        {/* Left — Photo + Info */}
        <div className="w-full md:w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-full sm:w-[60%] md:w-full h-auto object-cover rounded-lg"
            src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
            alt={info.detail.name}
          />
          <hr className="mt-6 mb-4 border-none h-[2px] bg-zinc-500" />

          {/* Social links */}
          <div className="text-2xl text-white flex gap-5 flex-wrap">
            {info.externalid?.wikidata_id && (
              <a target="_blank" rel="noreferrer" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
                <i className="ri-earth-fill hover:text-[#6556CD] transition-all duration-300" />
              </a>
            )}
            {info.externalid?.facebook_id && (
              <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
                <i className="ri-facebook-circle-fill hover:text-[#6556CD] transition-all duration-300" />
              </a>
            )}
            {info.externalid?.instagram_id && (
              <a target="_blank" rel="noreferrer" href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
                <i className="ri-instagram-fill hover:text-[#6556CD] transition-all duration-300" />
              </a>
            )}
            {info.externalid?.twitter_id && (
              <a target="_blank" rel="noreferrer" href={`https://www.twitter.com/${info.externalid.twitter_id}`}>
                <i className="ri-twitter-x-fill hover:text-[#6556CD] transition-all duration-300" />
              </a>
            )}
          </div>

          {/* Personal Info */}
          <h1 className="text-xl text-zinc-400 font-semibold my-4">Person Info</h1>
          {[
            { label: "Known For",    value: info.detail.known_for_department },
            { label: "Gender",       value: info.detail.gender === 2 ? "Male" : "Female" },
            { label: "Birthday",     value: info.detail.birthday },
            { label: "Deathday",     value: info.detail.deathday || "Still Alive" },
            { label: "Place of Birth", value: info.detail.place_of_birth },
            { label: "Also Known As", value: (info.detail.also_known_as || []).join(", ") },
          ].map(({ label, value }) => (
            <div key={label} className="mb-2">
              <h2 className="text-sm sm:text-base text-zinc-400 font-semibold">{label}</h2>
              <p className="text-zinc-500 text-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* Right — Name + Bio + Credits */}
        <div className="w-full md:w-[75%] md:ml-[5%]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-zinc-400 font-black my-4">{info.detail.name}</h1>
          <h2 className="text-lg sm:text-xl text-zinc-400 font-semibold">Biography</h2>
          <p className="text-zinc-400 mt-3 text-sm sm:text-base leading-relaxed">{info.detail.biography}</p>

          <h2 className="mt-6 text-lg text-zinc-400 font-semibold">Known For</h2>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between items-center mt-5">
            <h2 className="text-zinc-400 font-semibold text-lg">Acting</h2>
            <Dropdown title="Category" options={["tv", "movie"]} func={(e) => setCategory(e.target.value)} />
          </div>

          <div className="text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl border-2 border-zinc-700 p-4 sm:p-5 rounded-lg mt-3">
            {info[category + "Credits"].cast.map((c, i) => (
              <li key={i} className="hover:text-white duration-300 cursor-pointer list-disc ml-4 mb-2">
                <Link to={`/${category}/details/${c.id}`}>
                  <span className="text-sm sm:text-base">{c.name || c.title || c.original_title || c.original_name}</span>
                  {c.character && (
                    <span className="block ml-4 mt-1 text-xs sm:text-sm text-zinc-500">
                      Character: {c.character}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
