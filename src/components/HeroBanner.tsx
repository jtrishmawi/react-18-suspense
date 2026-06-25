import { MovieListObject, TvListResultObject } from "helpers/api";

interface Props {
  show: TvListResultObject & MovieListObject;
  label?: string;
}

export const HeroBanner = ({ show, label = "Discover on Netflix" }: Props) => {
  const title = show.title ?? show.name ?? "Featured";
  const year = (show.release_date ?? show.first_air_date ?? "").slice(0, 4);
  const rating = show.vote_average;

  return (
    <section
      aria-label={`${label}: ${title}`}
      className="relative w-full h-[60vh] min-h-[360px] max-h-[640px] overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <img
          src={show.poster_path ?? ""}
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-0 h-full w-1/2 md:w-2/5 object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-black from-40% via-black/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-transparent"
      />

      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 pt-20 pb-8 max-w-2xl">
        <p className="text-sm font-bold text-red-500 uppercase tracking-widest mb-3">
          {label}
        </p>
        <h2
          className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-3"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
        >
          {title}
        </h2>
        <div className="flex items-center gap-4 mb-4">
          {year && <span className="text-neutral-300 text-sm">{year}</span>}
          {rating != null && (
            <span className="text-emerald-400 text-sm font-semibold">
              <span aria-hidden="true">★ {rating.toFixed(1)}</span>
              <span className="sr-only">Rated {rating.toFixed(1)} out of 10</span>
            </span>
          )}
        </div>
        {show.overview && (
          <p className="text-neutral-300 text-sm leading-relaxed line-clamp-3 max-w-lg">
            {show.overview}
          </p>
        )}
      </div>
    </section>
  );
};
