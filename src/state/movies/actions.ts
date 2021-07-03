import Api, { MovieListObject, TvListResultObject } from "../../helpers/api";
import { Actions } from "./types";

export const actions = (dispatch: React.Dispatch<Actions>, api: Api) => ({
  getNetflix: () =>
    (async () => {
      const { data } = await api.discover.getDiscoverTv({
        with_networks: "213",
      });
      dispatch({
        type: "GET_NETFLIX",
        payload: data.results as TvListResultObject[],
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
        payload: data.results as MovieListObject[],
      });
    })(),
});
