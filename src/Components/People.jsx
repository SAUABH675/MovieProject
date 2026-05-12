import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../Utils/axios";
import Loading from "../Components/Loading";
import Cards from "./partials/Cards";
import Topnav from "./partials/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  document.title = "Movix - People";
  const navigate = useNavigate();
  const [category] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setPerson((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (person.length === 0) {
      GetPerson();
    } else {
      setPage(1);
      setPerson([]);
      GetPerson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className="w-full min-h-screen bg-[#1F1E24]">
      <div className="px-4 sm:px-[5%] w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 gap-3 pl-16 md:pl-4 sm:pl-[5%]">
        <h1 className="text-xl sm:text-2xl text-zinc-400 font-semibold flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full hover:bg-[#6556CD] flex items-center justify-center transition-all duration-300 cursor-pointer">
            <i className="ri-arrow-left-line text-lg" />
          </button>
          <Link to="/home" className="w-8 h-8 rounded-full hover:bg-[#6556CD] flex items-center justify-center transition-all duration-300">
            <i className="ri-home-line text-lg" />
          </Link>
          People
        </h1>
        <div className="w-full sm:w-[80%]">
          <Topnav />
        </div>
      </div>
      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<h1 className="text-center text-zinc-400 py-4">Loading...</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
