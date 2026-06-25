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

  // getTrendingMediaTypeTimeWindow's generated type has no page in its query
  // object (generated as params: RequestParams which omits query). Page 1 only.
  $getTrending: ({ page: _page = 1 }) => {
    rx.scheduled(
      api.trending.getTrendingMediaTypeTimeWindow("movie", "week"),
      rx.asapScheduler
    ).subscribe(({ data }) => {
      const results = (data as unknown as { results: MovieListObject[] }).results;
      dispatch({
        type: "GET_TRENDING",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as MovieListObject[],
      });
    });
  },

  // getMovieTopRated similarly has no typed query object for page.
  $getTopRated: ({ page: _page = 1 }) => {
    rx.scheduled(
      api.movie.getMovieTopRated(),
      rx.asapScheduler
    ).subscribe(({ data: { results } }) => {
      dispatch({
        type: "GET_TOP_RATED",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as MovieListObject[],
      });
    });
  },

  $getActionMovies: ({ page = 1 }) => {
    rx.scheduled(
      api.discover.getDiscoverMovie({ with_genres: "28", page }),
      rx.asapScheduler
    ).subscribe(({ data: { results } }) => {
      dispatch({
        type: "GET_ACTION_MOVIES",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as MovieListObject[],
      });
    });
  },

  $getComedyMovies: ({ page = 1 }) => {
    rx.scheduled(
      api.discover.getDiscoverMovie({ with_genres: "35", page }),
      rx.asapScheduler
    ).subscribe(({ data: { results } }) => {
      dispatch({
        type: "GET_COMEDY_MOVIES",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as MovieListObject[],
      });
    });
  },

  $getHorrorMovies: ({ page = 1 }) => {
    rx.scheduled(
      api.discover.getDiscoverMovie({ with_genres: "27", page }),
      rx.asapScheduler
    ).subscribe(({ data: { results } }) => {
      dispatch({
        type: "GET_HORROR_MOVIES",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as MovieListObject[],
      });
    });
  },

  $getRomanceMovies: ({ page = 1 }) => {
    rx.scheduled(
      api.discover.getDiscoverMovie({ with_genres: "10749", page }),
      rx.asapScheduler
    ).subscribe(({ data: { results } }) => {
      dispatch({
        type: "GET_ROMANCE_MOVIES",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as MovieListObject[],
      });
    });
  },

  $getDocumentaries: ({ page = 1 }) => {
    rx.scheduled(
      api.discover.getDiscoverMovie({ with_genres: "99", page }),
      rx.asapScheduler
    ).subscribe(({ data: { results } }) => {
      dispatch({
        type: "GET_DOCUMENTARIES",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as MovieListObject[],
      });
    });
  },
});
