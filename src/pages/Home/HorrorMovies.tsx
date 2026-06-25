// import Poster from "components/Poster";
import { PostersRow } from "components/PostersRow";
import { Spinner } from "components/Spinner";
import { lazy, Suspense, useEffect } from "react";
import { useData } from "state";
const Poster = lazy(() => import("components/Poster"));

const HorrorMovies = () => {
  const {
    state: {
      movies: { horrorMovies },
    },
    actions: {
      movies: { getHorrorMovies },
    },
  } = useData();

  useEffect(() => {
    getHorrorMovies();
  }, []);

  return (
    <PostersRow title="Horror movies">
      {horrorMovies?.map((movie, index) => (
        <Suspense key={`${movie.id}-${index}`} fallback={<Spinner />}>
          <Poster movie={movie} />
        </Suspense>
      ))}
    </PostersRow>
  );
};

export default HorrorMovies;
