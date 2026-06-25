import { HeroBanner } from "components/HeroBanner";
import { PostersRow } from "components/PostersRow";
import { Spinner } from "components/Spinner";
import { MovieListObject, TvListResultObject } from "helpers/api";
import { lazy, Suspense, useCallback, useEffect, useRef } from "react";
import { useData } from "state";

const Poster = lazy(() => import("components/Poster"));

type AnyMovie = TvListResultObject & MovieListObject;

// Reorder rows here to change which category gets the hero banner (first row)
// and to control display order. pageable: true means the category supports
// loading more pages when the user scrolls to the end of the row.
const ROWS = [
  { key: "netflix",       title: "Discover on Netflix", label: "Discover on Netflix", pageable: true  },
  { key: "trending",      title: "Trending movies",                                   pageable: false },
  { key: "topRated",      title: "Top rated movies",                                  pageable: false },
  { key: "actionMovies",  title: "Action movies",                                     pageable: true  },
  { key: "comedyMovies",  title: "Comedy movies",                                     pageable: true  },
  { key: "horrorMovies",  title: "Horror movies",                                     pageable: true  },
  { key: "romanceMovies", title: "Romance movies",                                    pageable: true  },
  { key: "documentaries", title: "Documentaries",                                     pageable: true  },
] as const;

type RowKey = (typeof ROWS)[number]["key"];

const Home = () => {
  const {
    state: { movies },
    $actions: { movies: $movieActions },
  } = useData();

  useEffect(() => {
    $movieActions.$getNetflix({ page: 1 });
    $movieActions.$getTrending({ page: 1 });
    $movieActions.$getTopRated({ page: 1 });
    $movieActions.$getActionMovies({ page: 1 });
    $movieActions.$getComedyMovies({ page: 1 });
    $movieActions.$getHorrorMovies({ page: 1 });
    $movieActions.$getRomanceMovies({ page: 1 });
    $movieActions.$getDocumentaries({ page: 1 });
  }, []);

  // Stable ref so scroll handlers always call the latest epic functions
  // without needing to be recreated when $movieActions reference changes.
  const $actionsRef = useRef($movieActions);
  useEffect(() => { $actionsRef.current = $movieActions; });

  // Tracks the last-dispatched page per row key.
  const nextPageRef = useRef<Partial<Record<RowKey, number>>>({});

  // Guards against multiple in-flight requests for the same row.
  const pendingRef = useRef<Set<RowKey>>(new Set());

  // Clear pending flag when new items arrive (epic completed).
  const prevMoviesRef = useRef(movies);
  useEffect(() => {
    for (const { key } of ROWS) {
      const k = key as keyof typeof movies;
      const prevLen = (prevMoviesRef.current[k] ?? []).length;
      const currLen = (movies[k] ?? []).length;
      if (currLen > prevLen) pendingRef.current.delete(key);
    }
    prevMoviesRef.current = movies;
  }, [movies]);

  const handleScrollEnd = useCallback((key: RowKey) => {
    if (pendingRef.current.has(key)) return;
    pendingRef.current.add(key);
    const next = (nextPageRef.current[key] ?? 1) + 1;
    nextPageRef.current[key] = next;
    const $a = $actionsRef.current;
    switch (key) {
      case "netflix":       $a.$getNetflix({ page: next });       break;
      case "actionMovies":  $a.$getActionMovies({ page: next });  break;
      case "comedyMovies":  $a.$getComedyMovies({ page: next });  break;
      case "horrorMovies":  $a.$getHorrorMovies({ page: next });  break;
      case "romanceMovies": $a.$getRomanceMovies({ page: next }); break;
      case "documentaries": $a.$getDocumentaries({ page: next }); break;
    }
  }, []);

  const getMovies = (key: RowKey) =>
    (movies[key as keyof typeof movies] ?? []) as unknown as AnyMovie[];

  const [firstRow, ...restRows] = ROWS;
  const firstData = getMovies(firstRow.key);
  const [featured, ...firstRest] = firstData;

  return (
    <>
      {featured && <HeroBanner show={featured} label={firstRow.label} />}
      {firstRest.length > 0 && (
        <PostersRow
          big
          title={firstRow.title}
          totalCount={firstRest.length}
          onScrollEnd={() => handleScrollEnd(firstRow.key)}
        >
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
          <PostersRow
            key={row.key}
            title={row.title}
            totalCount={data.length}
            onScrollEnd={row.pageable ? () => handleScrollEnd(row.key) : undefined}
          >
            {data.map((movie, index) => (
              <Suspense key={`${movie.id}-${index}`} fallback={<Spinner />}>
                <Poster movie={movie} />
              </Suspense>
            ))}
          </PostersRow>
        );
      })}
    </>
  );
};

export default Home;
