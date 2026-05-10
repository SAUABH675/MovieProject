import React, { useState, useEffect }    from "react";
import axios from '../../Utils/axios';
import no_image from '/no_image.webp';
import {Link} from "react-router-dom";

const Topnav = () => {
    const [query, setquery] = useState("");
    const [searches,setsearches]=useState([]);


    const GetSerches= async()=>{
        try {
            const {data} = await axios.get(`/search/multi?query=${query}`);            
             setsearches(data.results);
        }catch (error) {
            console.log("Error:", error);
        }
    };
    useEffect(()=>{
        GetSerches();
    },[query]);
    return( 
    <div className="w-[80%] h-[10vh] relative flex  mx-auto items-center ">
        <i className="ri-search-line  text-zinc-400 text-3xl"></i>
        <input
         type="text" placeholder="Search anything..." className=" w-[70%] bg-transparent border border-zinc-600 rounded-lg p-2 text-white flex outline-none" 
        value={query} onChange={(e) => setquery(e.target.value)} />
         {query.length>0 && (
            <i
                onClick={()=>setquery("")}
             className="ri-close-line  text-zinc-400 text-3xl right-0"></i>
         )}            
         <div className="z-[100] absolute w-[80%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto">

        {searches && searches.map((s,i)=>(
            <Link to={`/${s.media_type}/details/${s.id}`} key={i} className="hover:text-black  hover:bg-zinc-300 duration-300 font-semibold text-zinc-600  p-10  w-[100%] flex justify-start items-center border-b-2 border-zinc-200">
                <img
                className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
                 src={s.poster_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.poster_path || s.profile_path}`:no_image } alt="" />
                <span>
                    {s.name || 
                    s.title|| 
                    s.original_title || 
                    s.original_name}
                    </span>
            </Link>
        
        ))}
        </div>
        
    </div>
    )
    
};
export default Topnav;
