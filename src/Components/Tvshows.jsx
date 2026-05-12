import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../Utils/axios";
import Loading from "../Components/Loading";
import Cards from "./partials/Cards";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";

const Tvshows = () => {
  document.title = "Movix - TV Shows";
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setTv((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      GetTv();
    } else {
      setPage(1);
      setTv([]);
      GetTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className="w-full min-h-screen bg-[#1F1E24]">
      <div className="px-4 sm:px-[5%] w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 gap-3 pl-16 md:pl-4 sm:pl-[5%]">
        <h1 className="text-xl sm:text-2xl text-zinc-400 font-semibold flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full hover:bg-[#6556CD] flex items-center justify-center transition-all duration-300 cursor-pointer">
            <i className="ri-arrow-left-line text-lg" />
          </button>
          <Link to="/home" className="w-8 h-8 rounded-full hover:bg-[#6556CD] flex items-center justify-center transition-all duration-300">
            <i className="ri-home-line text-lg" />
          </Link>
          TV Shows
          <small className="text-sm text-zinc-600">({category.toUpperCase()})</small>
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-[80%] gap-2 sm:gap-0">
          <Topnav />
          <div className="flex gap-2 justify-end px-4 sm:px-0">
            <Dropdown title="Category" options={["popular", "top_rated", "on_the_air", "airing_today"]} func={(e) => setCategory(e.target.value)} />
          </div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={tv.length}
        next={GetTv}
        hasMore={hasMore}
        loader={<h1 className="text-center text-zinc-400 py-4">Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Tvshows;
