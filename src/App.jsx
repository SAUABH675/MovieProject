import { Route, Routes as Routers } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Home from "./Components/Home";
import Trending from "./Components/Trending";
import Popular from "./Components/Popular";
import Movie from "./Components/Movie";
import ContactUs from "./Components/ContactUs";
import About from "./Components/About";
import Tvshows from "./Components/Tvshows";
import People from "./Components/People";
import Login from "./Components/Login";
import Register from "./Components/Register"
import MovieDetails from "./Components/MovieDetails";
import TvDetails from "./Components/TvDetails";
import PersonDetails from "./Components/PersonDetails";
import Trailer from "./Components/partials/Trailer";
import Season from "./Components/Season";
import Notfound from "./Components/Notfound";
function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routers>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Home" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tv" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
          <Route path="/tv/details/:id/season/:seasonid" element={<Season />} />
        </Route>
        

        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Notfound />} />
      </Routers>
    </div>
  );
}
export default App;
