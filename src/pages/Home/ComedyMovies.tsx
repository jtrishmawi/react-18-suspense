// import Poster from "components/Poster";
import { PostersRow } from "components/PostersRow";
import { Spinner } from "components/Spinner";
import { lazy, Suspense, useEffect } from "react";
import { useData } from "state";
const Poster = lazy(() => import("components/Poster"));

const ComedyMovies = () => {
  const {
    state: {
      movies: { comedyMovies },
    },
    actions: {
      movies: { getComedyMovies },
    },
  } = useData();

  useEffect(() => {
    getComedyMovies();
  }, []);

  return (
    <PostersRow title="Comedy Movies">
      {comedyMovies?.map((movie, index) => (
        <Suspense key={`${movie.id}-${index}`} fallback={<Spinner />}>
          <Poster movie={movie} />
        </Suspense>
      ))}
    </PostersRow>
  );
};

export default ComedyMovies;
