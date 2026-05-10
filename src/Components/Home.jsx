import React, { useState, useEffect } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../Utils/axios";
import Header from "./partials/Header";
import HomeScroller from "./partials/HomeScroller";
import HoriZontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "../Components/Loading";
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
    <>
      <Sidenav />

      <div className="w-[80%]  h-full bg-[#1F1E24] overflow-auto overflow-x-hidden">
        <Topnav />
        <HomeScroller data={wallpaper} title="movie" />

        <div className=" flex justify-between items-center p-5">
          <h1 className=" text-3xl text-zinc-400 font-semibold">Trending</h1>
          <Dropdown
            title="Filter"
            options={["all", "movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HoriZontalCards data={trending} func={setcategory} />
      </div>
    </>
  ) : (
    <Loading />
  );
};
export default Home;
