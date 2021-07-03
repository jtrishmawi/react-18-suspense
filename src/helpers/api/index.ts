import { Api as ApiClient, ApiConfig } from "./__generated__/Api";

class Api extends ApiClient<ApiConfig> {
  constructor() {
    super({
      baseApiParams: {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      },
    });
  }
}

export default Api;
export * from "./__generated__/Api";
