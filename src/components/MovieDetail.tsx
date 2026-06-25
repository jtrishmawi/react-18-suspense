import { MovieListObject, TvListResultObject } from "helpers/api";
import { MouseEvent, useEffect, useId, useRef } from "react";

type AnyMovie = TvListResultObject & MovieListObject;

interface Props {
  movie: AnyMovie | null;
  onClose: () => void;
}

export function MovieDetail({ movie, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (movie) {
      // Capture BEFORE showModal — activeElement shifts to dialog after open.
      triggerRef.current = document.activeElement as HTMLElement;
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [movie]);

  const handleClose = () => {
    triggerRef.current?.focus();
    onClose();
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const title = movie?.title ?? movie?.name ?? "Unknown";
  const year = (movie?.release_date ?? movie?.first_air_date ?? "").slice(0, 4);
  const rating = movie?.vote_average;

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onClick={handleBackdropClick}
      aria-modal="true"
      aria-labelledby={titleId}
      className="m-auto p-0 w-[90vw] max-w-2xl max-h-[90vh] rounded-xl bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden border-0 outline-none"
    >
      {movie && (
        <div className="flex flex-col sm:flex-row max-h-[90vh]">
          <div className="sm:w-48 w-full shrink-0 bg-neutral-200 dark:bg-neutral-800 sm:self-stretch">
            <img
              src={movie.poster_path ?? ""}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col p-6 gap-4 overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <h2
                id={titleId}
                className="text-xl font-bold text-neutral-900 dark:text-white leading-tight"
              >
                {title}
              </h2>
              <button
                type="button"
                autoFocus
                onClick={handleClose}
                aria-label="Close details"
                className="shrink-0 p-1.5 rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-red"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              {year && (
                <span className="text-neutral-600 dark:text-neutral-300">
                  <span className="sr-only">Released </span>
                  {year}
                </span>
              )}
              {rating != null && (
                <span>
                  <span
                    aria-hidden="true"
                    className="text-emerald-700 dark:text-emerald-400 font-semibold"
                  >
                    ★ {rating.toFixed(1)}
                  </span>
                  <span className="sr-only">
                    Rating: {rating.toFixed(1)} out of 10
                  </span>
                </span>
              )}
            </div>
            {movie.overview && (
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {movie.overview}
              </p>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
