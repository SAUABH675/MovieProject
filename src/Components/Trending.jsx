import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./pertials/Topnav";
import Dropdown from "./pertials/Dropdown";
import axios from "../Utils/axios";
import Cards from "./pertials/Cards";
import Loading from "../Components/Loading";
import InfiniteScroll  from 'react-infinite-scroll-component';
function Trending() {
    document.title="DB | Trending";
    const navigate = useNavigate();
    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState("day");
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore]=useState(true)

    const GetTranding = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
            if(data.results.length>0){
                setTrending((prevState=>[...prevState,...data.results]));
                setPage(page+1);
            }else{
                setHasMore(false);
            }
            

        } catch (error) {
            console.log("Error:", error);
        };
    };

    const refershHandler=()=>{
        if(trending.length ===0){
            GetTranding();
        }else{
            setPage(1);
            setTrending([]);
            GetTranding();
        }
    }
    useEffect(() => {
        refershHandler();
    }, [category, duration]);



    return trending.length>0 ? (
        <div className=" w-screen h-screen ">
            <div className="px-[5%] w-full flex items-center justify-between">
                <h1 className=" text-2xl text-zinc-400 font-semibold">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>
                    Trending
                </h1>
                <div className="flex items-center w-[80%]">
                    <Topnav />
                    <Dropdown
                        title='Category'
                        options={["movie", "tv", "all"]}
                        func={(e) => setCategory(e.target.value)} />
                    <div className="w-[2%]"></div>
                    <Dropdown
                        title='Duration'
                        options={["week", "day"]}
                        func={(e) => setDuration(e.target.value)} />
                </div>

            </div>

            <InfiniteScroll
                dataLength={trending.length}
                next={GetTranding}
                hasMore={hasMore}
                loader={<h1>Loading... </h1>}>
                <Cards data={trending} title={category} />

            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
}
export default Trending;
