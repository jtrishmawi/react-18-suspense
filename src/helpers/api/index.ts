import {
  Api as ApiClient,
  ApiConfig as ApiClientConfig,
  ImagePath,
} from "./__generated__/Api";

interface ApiConfig {
  images?:
    | {
        base_url?: string | undefined;
        secure_base_url?: string | undefined;
        backdrop_sizes?: string[] | undefined;
        logo_sizes?: string[] | undefined;
        poster_sizes?: string[] | undefined;
        profile_sizes?: string[] | undefined;
        still_sizes?: string[] | undefined;
      }
    | undefined;
  change_keys?: string[] | undefined;
}

class Api extends ApiClient<ApiClientConfig> {
  constructor() {
    super({
      baseApiParams: {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      },
    });
    this.getConfig();
  }

  private _config!: ApiConfig;

  private async getConfig() {
    console.log("config");
    const { data } = await this.configuration.getConfiguration();
    this._config = data;
  }

  public getImagePathFor(path: ImagePath | undefined): ImagePath {
    if (!this._config) {
      return path || "";
    } else {
      return `${this._config.images?.base_url}w342${path || ""}`;
    }
  }
}

export default Api;
export * from "./__generated__/Api";
