import { HeroBanner } from "components/HeroBanner";
import { PostersRow } from "components/PostersRow";
import { Spinner } from "components/Spinner";
import { lazy, Suspense, useEffect } from "react";
import { useData } from "state";

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

  const [featured, ...rest] = netflix ?? [];

  return (
    <>
      {featured && <HeroBanner show={featured} />}
      {rest.length > 0 && (
        <PostersRow big title="Discover on Netflix">
          {rest.map((movie, index) => (
            <Suspense key={`${movie.id}-${index}`} fallback={<Spinner />}>
              <Poster movie={movie} />
            </Suspense>
          ))}
        </PostersRow>
      )}
    </>
  );
};

export default Netflix;
