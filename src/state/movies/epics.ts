import Api, { MovieListObject, TvListResultObject } from "../../helpers/api";
import { Actions, DispatchEpics } from "./types";
import * as rx from "rxjs";

export const epics = (
  dispatch: React.Dispatch<Actions>,
  api: Api
): DispatchEpics => ({
  $getNetflix: ({ page = 1 }) => {
    rx.scheduled(
      api.discover.getDiscoverTv({
        language: "en",
        page,
        with_networks: "213",
        sort_by: "first_air_date.desc",
      }),
      rx.asapScheduler
    ).subscribe(({ data: { results } }) => {
      dispatch({
        type: "SET_NETFLIX",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path, "w342"),
        })) as TvListResultObject[],
      });
    });
  },
  $getTrending: () =>
    (async () => {
      const { data } = await api.trending.getTrendingMediaTypeTimeWindow(
        "movie",
        "week"
      );
      dispatch({
        type: "GET_TRENDING",
        // @ts-expect-error
        payload: data.results.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as MovieListObject[],
      });
    })(),
  $getTopRated: () =>
    (async () => {
      const {
        data: { results },
      } = await api.movie.getMovieTopRated();
      dispatch({
        type: "GET_TOP_RATED",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as MovieListObject[],
      });
    })(),
  $getActionMovies: () =>
    (async () => {
      const {
        data: { results },
      } = await api.discover.getDiscoverMovie({ with_genres: "28" });
      dispatch({
        type: "GET_ACTION_MOVIES",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as MovieListObject[],
      });
    })(),
  $getComedyMovies: () =>
    (async () => {
      const {
        data: { results },
      } = await api.discover.getDiscoverMovie({ with_genres: "35" });
      dispatch({
        type: "GET_COMEDY_MOVIES",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as MovieListObject[],
      });
    })(),
  $getHorrorMovies: () =>
    (async () => {
      const {
        data: { results },
      } = await api.discover.getDiscoverMovie({ with_genres: "27" });
      dispatch({
        type: "GET_HORROR_MOVIES",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as MovieListObject[],
      });
    })(),
  $getRomanceMovies: () =>
    (async () => {
      const {
        data: { results },
      } = await api.discover.getDiscoverMovie({ with_genres: "10749" });
      dispatch({
        type: "GET_ROMANCE_MOVIES",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as MovieListObject[],
      });
    })(),
  $getDocumentaries: () =>
    (async () => {
      const {
        data: { results },
      } = await api.discover.getDiscoverMovie({ with_genres: "99" });
      dispatch({
        type: "GET_DOCUMENTARIES",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as MovieListObject[],
      });
    })(),
});
