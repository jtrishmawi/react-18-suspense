// import Poster from "components/Poster";
import { PostersRow } from "components/PostersRow";
import { Spinner } from "components/Spinner";
import { lazy, Suspense, useEffect } from "react";
import { useData } from "state";
import { v4 } from "uuid";

const Poster = lazy(() => import("components/Poster"));

const TopRated = () => {
  const {
    state: {
      movies: { topRated },
    },
    actions: {
      movies: { getTopRated },
    },
  } = useData();

  useEffect(() => {
    getTopRated();
  }, []);

  return (
    <PostersRow title="Top rated movies">
      {topRated?.map((movie) => (
        <Suspense key={v4()} fallback={<Spinner />}>
          <Poster movie={movie} />
        </Suspense>
      ))}
    </PostersRow>
  );
};

export default TopRated;
