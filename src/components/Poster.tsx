import { MovieListObject, TvListResultObject } from "helpers/api";
import { useState } from "react";
import SuspenseImage from "./SuspenseImage";

interface Props {
  movie: TvListResultObject & MovieListObject;
}

const Poster = ({ movie }: Props) => {
  const title = movie.title ?? movie.name ?? "Unknown";
  const year = (movie.release_date ?? movie.first_air_date ?? "").slice(0, 4);
  const rating = movie.vote_average;
  const [visible, setVisible] = useState(false);

  const ariaLabel = [
    title,
    year || null,
    rating != null ? `rated ${rating.toFixed(1)} out of 10` : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="relative overflow-hidden rounded-sm w-full h-full">
      <button
        type="button"
        className="relative w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
        aria-label={ariaLabel}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      >
        <SuspenseImage
          src={movie.poster_path!}
          alt=""
          className={`w-full h-full object-cover transition-transform duration-300 ${
            visible ? "scale-105" : "scale-100"
          }`}
        />
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-black/90 via-black/60 to-transparent transition-transform duration-300 ${
            visible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <p className="text-white font-bold text-sm leading-tight line-clamp-2">
            {title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            {year && (
              <span className="text-neutral-300 text-xs">{year}</span>
            )}
            {rating != null && (
              <span
                aria-hidden="true"
                className="text-emerald-400 text-xs font-semibold"
              >
                ★ {rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </button>
    </article>
  );
};

export default Poster;
