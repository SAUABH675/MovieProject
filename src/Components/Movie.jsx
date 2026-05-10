import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Utils/axios";
import Loading from "../Components/Loading"
import Cards from "./partials/Cards";
import Topnav from "./partials/Topnav"
import Dropdown from "./partials/Dropdown";
import InfiniteScroll  from 'react-infinite-scroll-component';
const Movie=()=>{
    document.title="Movix - Movie";
    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movie, setMovie]= useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore]=useState(true);
    

    const GetMovie = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`);
            if(data.results.length>0){
                setMovie((prevState=>[...prevState,...data.results]));
                setPage(page+1);
            }else{
                setHasMore(false);
            }
            

        } catch (error) {
            console.log("Error:", error);
        };
    };

    const refreshHandler=()=>{
        if(movie.length ===0){
            GetMovie();
        }else{
            setPage(1);
            setMovie([]);
            setHasMore(true);
        }
    }
    useEffect(() => {
        refreshHandler();
    }, [category]);
    return movie.length>0?(
        <div className=" w-screen h-screen ">
            <div className="px-[5%] w-full flex items-center justify-between">
                <h1 className=" text-2xl text-zinc-400 font-semibold">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    Movie <small className="ml-2 text-sn text-zinc-600">({category})</small>
                </h1>
                <div className=" flex items-center w-[80%]">
                    <Topnav />
                    <Dropdown
                        title='Category'
                        options={["popular","top_rated","upcoming","now_playing"]}
                        func={(e) => setCategory(e.target.value)} />
                    <div className="w-[2%]"></div>
                    
                </div>

            </div>

            <InfiniteScroll
                dataLength={movie.length}
                next={GetMovie}
                hasMore={hasMore}
                loader={<h1>Loading... </h1>}>
                <Cards data={movie} title="movie" />

            </InfiniteScroll>
        </div>
    ):(
        <Loading />
    );
};
export default Movie;
