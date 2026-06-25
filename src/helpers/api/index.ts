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
  fallbackUrl =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNjAiIGhlaWdodD0iNDgwIiB2aWV3Qm94PSIwIDAgMzYwIDQ4MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFhMWEyZSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzBmMzQ2MCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIzNjAiIGhlaWdodD0iNDgwIiBmaWxsPSJ1cmwoI2cpIi8+PGNpcmNsZSBjeD0iMTgwIiBjeT0iMjEwIiByPSI1NiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmMWEiIHN0cm9rZS13aWR0aD0iMS41Ii8+PGNpcmNsZSBjeD0iMTgwIiBjeT0iMjEwIiByPSI0NCIgZmlsbD0iI2ZmZmZmZjBkIi8+PHBvbHlnb24gcG9pbnRzPSIxNjgsMTkyIDE2OCwyMjggMjA4LDIxMCIgZmlsbD0iI2ZmZmZmZjY2Ii8+PHJlY3QgeD0iNjAiIHk9IjMzMCIgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxIiBmaWxsPSIjZmZmZmZmMTEiLz48dGV4dCB4PSIxODAiIHk9IjM1OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZjMzIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgbGV0dGVyLXNwYWNpbmc9IjMiPk5PIFBPU1RFUjwvdGV4dD48L3N2Zz4=";
  constructor() {
    super({
      baseApiParams: {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
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
      | "original" = "w185",
  ): ImagePath {
    let resource = this.imgCache.get(path + "");
    if (resource) return resource;
    if (!this._config) {
      // Config hasn't loaded yet — return fallback without caching so the
      // next call (after config resolves) can build the real URL.
      return this.fallbackUrl;
    }
    const url = path
      ? `${this._config.images?.secure_base_url}${size}${path}`
      : this.fallbackUrl;
    this.imgCache.set(path + "", url);
    return url;
  }
}

export default Api;
export * from "./__generated__/Api";

