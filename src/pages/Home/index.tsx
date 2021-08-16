import HomeErrorBoundary from "errors/HomeErrorBoundary";
import Netflix from "./Netflix";
import ActionMovies from "./ActionMovies";
import ComedyMovies from "./ComedyMovies";
import Documentaries from "./Documentaries";
import HorrorMovies from "./HorrorMovies";
import RomanceMovies from "./RomanceMovies";
import TopRated from "./TopRated";
import Trending from "./Trending";

const Home = () => (
  <HomeErrorBoundary>
    <Netflix />
    <Trending />
    <TopRated />
    <ActionMovies />
    <ComedyMovies />
    <HorrorMovies />
    <RomanceMovies />
    <Documentaries />
  </HomeErrorBoundary>
);

export default Home;
