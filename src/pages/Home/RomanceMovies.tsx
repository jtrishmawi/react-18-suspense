// import Poster from "components/Poster";
import { PostersRow } from "components/PostersRow";
import { Spinner } from "components/Spinner";
import { lazy, Suspense, useEffect } from "react";
import { useData } from "state";
import { v4 } from "uuid";

const Poster = lazy(() => import("components/Poster"));

const RomanceMovies = () => {
  const {
    state: {
      movies: { romanceMovies },
    },
    actions: {
      movies: { getRomanceMovies },
    },
  } = useData();

  useEffect(() => {
    getRomanceMovies();
  }, []);

  return (
    <PostersRow title="Romance movies">
      {romanceMovies?.map((movie) => (
        <Suspense key={v4()} fallback={<Spinner />}>
          <Poster movie={movie} />
        </Suspense>
      ))}
    </PostersRow>
  );
};

export default RomanceMovies;
