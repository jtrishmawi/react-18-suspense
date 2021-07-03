import { useData, withData } from "./state";
import { Main } from "./components/Main";
import { PostersRow } from "./components/PostersRow";
import { Poster } from "./components/Poster";

function App() {
  const {
    state: {
      movies: { netflix, trending },
    },
  } = useData();

  return (
    <Main>
      <h1>Welcome home...</h1>
      {netflix.length > 0 && (
        <PostersRow>
          <h2>Discover on Netflix</h2>
          {netflix.map((movie) => (
            <Poster key={movie.id} movie={movie} />
          ))}
        </PostersRow>
      )}
      {trending.length > 0 && (
        <PostersRow>
          <h2>Trending this week...</h2>
          {trending.map((movie) => (
            <Poster key={movie.id} movie={movie} />
          ))}
        </PostersRow>
      )}
    </Main>
  );
}

export default withData(App);
