import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Utils/axios";
import Loading from "../Components/Loading"
import Cards from "./pertials/Cards";
import Topnav from "./pertials/Topnav"
import InfiniteScroll  from 'react-infinite-scroll-component';

const People =()=>{
     document.title="DB | person";
    const navigate = useNavigate();
    const [category, setCategory] = useState("popular");
    const [person, setPerson]= useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore]=useState(true);
    

    const GetPerson = async () => {
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`);
            if(data.results.length>0){
                setPerson((prevState=>[...prevState,...data.results]));
                setPage(page+1);
            }else{
                setHasMore(false);
            }
            

        } catch (error) {
            console.log("Error:", error);
        };
    };

    const refershHandler=()=>{
        if(person.length ===0){
            GetPerson();
        }else{
            setPage(1);
            setPerson([]);
            GetPerson();
        }
    }
    useEffect(() => {
        refershHandler();
    }, [category]);

    return person.length>0?(
        <div className=" w-screen h-screen ">
            <div className="px-[5%] w-full flex items-center justify-between">
                <h1 className=" text-2xl text-zinc-400 font-semibold">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    People
                </h1>
                <div className="flex items-center w-[80%]">
                    <Topnav />
                    
                    <div className="w-[2%]"></div>
                    
                </div>

            </div>

            <InfiniteScroll
                dataLength={person.length}
                next={GetPerson}
                hasMore={hasMore}
                loader={<h1>Loading... </h1>}>
                <Cards data={person} title="person" />

            </InfiniteScroll>
        </div>
    ):(
        <Loading />
    );
};
export default People;
