import { HeroBanner } from "components/HeroBanner";
import { PostersRow } from "components/PostersRow";
import { Spinner } from "components/Spinner";
import HomeErrorBoundary from "errors/HomeErrorBoundary";
import { MovieListObject, TvListResultObject } from "helpers/api";
import { lazy, Suspense, useEffect } from "react";
import { useData } from "state";

const Poster = lazy(() => import("components/Poster"));

type AnyMovie = TvListResultObject & MovieListObject;

// Reorder rows here to change which category gets the hero banner (first row)
// and to control the display order on the page.
const ROWS = [
  { key: "netflix",       title: "Discover on Netflix", label: "Discover on Netflix" },
  { key: "trending",      title: "Trending movies" },
  { key: "topRated",      title: "Top rated movies" },
  { key: "actionMovies",  title: "Action movies" },
  { key: "comedyMovies",  title: "Comedy movies" },
  { key: "horrorMovies",  title: "Horror movies" },
  { key: "romanceMovies", title: "Romance movies" },
  { key: "documentaries", title: "Documentaries" },
] as const;

type RowKey = (typeof ROWS)[number]["key"];

const Home = () => {
  const {
    state: { movies },
    actions: { movies: movieActions },
    $actions: { movies: $movieActions },
  } = useData();

  useEffect(() => {
    $movieActions.$getNetflix({ page: 1 });
    movieActions.getTrending();
    movieActions.getTopRated();
    movieActions.getActionMovies();
    movieActions.getComedyMovies();
    movieActions.getHorrorMovies();
    movieActions.getRomanceMovies();
    movieActions.getDocumentaries();
  }, []);

  const getMovies = (key: RowKey) =>
    (movies[key as keyof typeof movies] ?? []) as unknown as AnyMovie[];

  const [firstRow, ...restRows] = ROWS;
  const firstData = getMovies(firstRow.key);
  const [featured, ...firstRest] = firstData;

  return (
    <HomeErrorBoundary>
      {featured && <HeroBanner show={featured} label={firstRow.label} />}
      {firstRest.length > 0 && (
        <PostersRow big title={firstRow.title}>
          {firstRest.map((movie, index) => (
            <Suspense key={`${movie.id}-${index}`} fallback={<Spinner />}>
              <Poster movie={movie} />
            </Suspense>
          ))}
        </PostersRow>
      )}
      {restRows.map((row) => {
        const data = getMovies(row.key);
        if (!data.length) return null;
        return (
          <PostersRow key={row.key} title={row.title}>
            {data.map((movie, index) => (
              <Suspense key={`${movie.id}-${index}`} fallback={<Spinner />}>
                <Poster movie={movie} />
              </Suspense>
            ))}
          </PostersRow>
        );
      })}
    </HomeErrorBoundary>
  );
};

export default Home;
