import Api, { MovieListObject, TvListResultObject } from "../../helpers/api";
import { Actions } from "./types";

export const actions = (dispatch: React.Dispatch<Actions>, api: Api) => ({
  getNetflix: () =>
    (async () => {
      const {
        data: { results },
      } = await api.discover.getDiscoverTv({
        with_networks: "213",
      });
      dispatch({
        type: "GET_NETFLIX",
        payload: results?.map((m) => ({
          ...m,
          poster_path: api.getImagePathFor(m.poster_path),
        })) as TvListResultObject[],
      });
    })(),
  getTrending: () =>
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
});
