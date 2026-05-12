import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../Utils/axios";
import Cards from "./partials/Cards";
import Loading from "../Components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
  document.title = "Movix - Trending";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetTrending = async (currentPage) => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${currentPage}`);
      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results]);
        setPage(currentPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setTrending([]);
    setHasMore(true);
  }, [category, duration]);

  useEffect(() => {
    if (page === 1) GetTrending(1);
  }, [page, category, duration]);

  return trending.length > 0 ? (
    <div className="w-full min-h-screen bg-[#1F1E24]">
      {/* Header */}
      <div className="px-4 sm:px-[5%] w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 gap-3 sm:gap-0 pl-16 md:pl-4 sm:pl-[5%]">
        <h1 className="text-xl sm:text-2xl text-zinc-400 font-semibold flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full hover:bg-[#6556CD] flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <i className="ri-arrow-left-line text-lg" />
          </button>
          <Link to="/home" className="w-8 h-8 rounded-full hover:bg-[#6556CD] flex items-center justify-center transition-all duration-300">
            <i className="ri-home-line text-lg" />
          </Link>
          Trending
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-[80%] gap-2 sm:gap-0">
          <Topnav />
          <div className="flex gap-2 justify-end px-4 sm:px-0">
            <Dropdown title="Category" options={["movie", "tv", "all"]} func={(e) => setCategory(e.target.value)} />
            <Dropdown title="Duration" options={["week", "day"]} func={(e) => setDuration(e.target.value)} />
          </div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={() => GetTrending(page)}
        hasMore={hasMore}
        loader={<h1 className="text-center text-zinc-400 py-4">Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
