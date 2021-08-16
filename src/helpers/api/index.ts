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
  imgCache = new Map<string, any>();
  fallbackUrl = "https://www.loremflickr.com/360/480";
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
    const { data } = await this.configuration.getConfiguration();
    this._config = data;
  }

  public getImagePathFor(
    path: ImagePath | undefined,
    size:
      | "w92"
      | "w154"
      | "w185"
      | "w342"
      | "w500"
      | "w780"
      | "original" = "w185"
  ): ImagePath {
    let resource = this.imgCache.get(path + "");
    if (resource) return resource;
    let url = "";
    if (!this._config) {
      url = path || this.fallbackUrl;
    } else {
      url = path
        ? `${this._config.images?.secure_base_url}${size}${path}`
        : this.fallbackUrl;
    }
    this.imgCache.set(path + "", url);
    return url;
  }
}

export default Api;
export * from "./__generated__/Api";
