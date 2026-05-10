import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Utils/axios";
import Loading from "../Components/Loading"
import Cards from "./partials/Cards";
import Topnav from "./partials/Topnav"
import Dropdown from "./partials/Dropdown";
import InfiniteScroll  from 'react-infinite-scroll-component';
const Popular =()=>{
    document.title="DB | Popular";
    const navigate = useNavigate();
    const [category, setCategory] = useState("movie");
    const [popular, setPopular]= useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore]=useState(true);
    

    const GetPopular = async () => {
        try {
            const { data } = await axios.get(`${category}/popular?page=${page}`);
            if(data.results.length>0){
                setPopular((prevState=>[...prevState,...data.results]));
                setPage(page+1);
            }else{
                setHasMore(false);
            }
            

        } catch (error) {
            console.log("Error:", error);
        };
    };

    const refershHandler=()=>{
        if(popular.length ===0){
            GetPopular();
        }else{
            setPage(1);
            setPopular([]);
            GetPopular();
        }
    }
    useEffect(() => {
        refershHandler();
    }, [category]);

    return popular.length>0?(
        <div className=" w-screen h-screen ">
            <div className="px-[5%] w-full flex items-center justify-between">
                <h1 className=" text-2xl text-zinc-400 font-semibold">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    Popular
                </h1>
                <div className="flex items-center w-[80%]">
                    <Topnav />
                    <Dropdown
                        title='Category'
                        options={["tv", "movie"]}
                        func={(e) => setCategory(e.target.value)} />
                    <div className="w-[2%]"></div>
                    
                </div>

            </div>

            <InfiniteScroll
                dataLength={popular.length}
                next={GetPopular}
                hasMore={hasMore}
                loader={<h1>Loading... </h1>}>
                <Cards data={popular} title={category} />

            </InfiniteScroll>
        </div>
    ):(
        <Loading />
    );
};

export default Popular;
