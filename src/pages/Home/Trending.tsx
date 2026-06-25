// import Poster from "components/Poster";
import { PostersRow } from "components/PostersRow";
import { Spinner } from "components/Spinner";
import { lazy, Suspense, useEffect } from "react";
import { useData } from "state";
const Poster = lazy(() => import("components/Poster"));

const Trending = () => {
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
    <PostersRow title="Trending movies">
      {trending?.map((movie, index) => (
        <Suspense key={`${movie.id}-${index}`} fallback={<Spinner />}>
          <Poster movie={movie} />
        </Suspense>
      ))}
    </PostersRow>
  );
};

export default Trending;
