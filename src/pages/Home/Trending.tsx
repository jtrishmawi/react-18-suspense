import { PostersRow } from "components/PostersRow";
import { Poster } from "components/Poster";
import { useEffect } from "react";
import { useData } from "state";

export const Trending = () => {
  const {
    state: {
      movies: { trending },
    },
    actions: {
      movies: { getTrending },
    },
  } = useData();

  useEffect(() => {
    getTrending();
  }, []);

  return (
    (trending.length > 0 && (
      <PostersRow>
        <h2>Discover on trending</h2>
        {trending.map((movie) => (
          <Poster key={movie.id} movie={movie} />
        ))}
      </PostersRow>
    )) ||
    null
  );
};
