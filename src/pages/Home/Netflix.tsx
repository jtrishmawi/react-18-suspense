import { PostersRow } from "components/PostersRow";
import { Poster } from "components/Poster";
import { useEffect } from "react";
import { useData } from "state";

export const Netflix = () => {
  const {
    state: {
      movies: { netflix },
    },
    actions: {
      movies: { getNetflix },
    },
  } = useData();

  useEffect(() => {
    getNetflix();
  }, []);

  return (
    (netflix.length > 0 && (
      <PostersRow>
        <h2>Discover on Netflix</h2>
        {netflix.map((movie) => (
          <Poster key={movie.id} movie={movie} />
        ))}
      </PostersRow>
    )) ||
    null
  );
};
