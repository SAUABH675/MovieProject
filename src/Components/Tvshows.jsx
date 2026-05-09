import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Utils/axios";
import Loading from "../Components/Loading"
import Cards from "./pertials/Cards";
import Topnav from "./pertials/Topnav"
import Dropdown from "./pertials/Dropdown";
import InfiniteScroll  from 'react-infinite-scroll-component';
const Tvshows=()=>{
    document.title="DB | Tv Shows";
    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    const [tv, setTv]= useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore]=useState(true);
    

    const GetTv = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`);
            if(data.results.length>0){
                setTv((prevState=>[...prevState,...data.results]));
                setPage(page+1);
            }else{
                setHasMore(false);
            }
            

        } catch (error) {
            console.log("Error:", error);
        };
    };

    const refershHandler=()=>{
        if(tv.length ===0){
            GetTv();
        }else{
            setPage(1);
            setTv([]);
            GetTv();
        }
    }
    useEffect(() => {
        refershHandler();
    }, [category]);
    return tv.length>0?(
        <div className=" w-screen h-screen ">
            <div className="px-[5%] w-full flex items-center justify-between">
                <h1 className=" text-2xl text-zinc-400 font-semibold">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    Tv Shows <small className="ml-2 text-sn text-zinc-600">({category})</small>
                </h1>
                <div className="flex items-center w-[80%]">
                    <Topnav />
                    <Dropdown
                        title='Category'
                        options={["popular","top_rated","on_the_air","airing_today"]}
                        func={(e) => setCategory(e.target.value)} />
                    <div className="w-[2%]"></div>
                    
                </div>

            </div>

            <InfiniteScroll
                dataLength={tv.length}
                next={GetTv}
                hasMore={hasMore}
                loader={<h1>Loading... </h1>}>
                <Cards data={tv} title="tv" />

            </InfiniteScroll>
        </div>
    ):(
        <Loading />
    );
};
export default Tvshows;
