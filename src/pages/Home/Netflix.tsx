// import Poster from "components/Poster";
import { PostersRow } from "components/PostersRow";
import { Spinner } from "components/Spinner";
import { lazy, Suspense, useEffect } from "react";
import { useData } from "state";
import { v4 } from "uuid";

const Poster = lazy(() => import("components/Poster"));

const Netflix = () => {
  const {
    state: {
      movies: { netflix },
    },
    $actions: {
      movies: { $getNetflix },
    },
  } = useData();

  useEffect(() => {
    $getNetflix({ page: 1 });
  }, []);

  return (
    <PostersRow big title="Discover on Netflix">
      {netflix?.map((movie) => (
        <Suspense key={v4()} fallback={<Spinner />}>
          <Poster movie={movie} />
        </Suspense>
      ))}
    </PostersRow>
  );
};

export default Netflix;
