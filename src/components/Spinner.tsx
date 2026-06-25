export const Spinner = () => (
  <div
    role="status"
    className="w-full h-full min-h-[200px] grid place-items-center"
  >
    <div
      aria-hidden="true"
      className="w-8 h-8 border-2 border-neutral-600 border-t-cinema-red rounded-full animate-spin"
    />
    <span className="sr-only">Loading...</span>
  </div>
);
