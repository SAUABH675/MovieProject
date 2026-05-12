import React, { useState, useEffect } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../Utils/axios";
import HomeScroller from "./partials/HomeScroller";
import HoriZontalCards from "./partials/HorizontalCards";
import Loading from "../Components/Loading";
import Dropdown from "./partials/Dropdown";

const Home = () => {
  document.title = "Movix - Homepage";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      setwallpaper(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const GetTranding = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    GetTranding();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <div className="flex w-full h-full">
      <Sidenav />
      <div className="flex-1 h-full bg-[#1F1E24] overflow-y-auto overflow-x-hidden">
        <div className="pl-14 md:pl-0">
          <Topnav />
        </div>
        <HomeScroller data={wallpaper} title="movie" />
        <div className="flex justify-between items-center px-4 py-3 sm:px-5 sm:py-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-zinc-400 font-semibold">
            Trending
          </h1>
          <Dropdown
            title="Filter"
            options={["all", "movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HoriZontalCards data={trending} func={setcategory} />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
