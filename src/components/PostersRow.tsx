import {
  Children,
  CSSProperties,
  KeyboardEvent,
  PropsWithChildren,
  useEffect,
  useId,
  useRef,
} from "react";

interface Props {
  big?: boolean;
  title: string;
  onScrollEnd?: () => void;
  totalCount?: number;
}

export const PostersRow = ({
  title,
  big,
  children,
  onScrollEnd,
  totalCount,
}: PropsWithChildren<Props>) => {
  const id = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const prevCountRef = useRef(totalCount ?? 0);
  const onScrollEndRef = useRef(onScrollEnd);

  // Always keep the callback ref up to date without recreating the listener.
  useEffect(() => { onScrollEndRef.current = onScrollEnd; });

  // Announce newly loaded items to screen readers via the live region.
  useEffect(() => {
    const count = totalCount ?? 0;
    const prev = prevCountRef.current;
    if (count > prev && statusRef.current) {
      const added = count - prev;
      // Clear first so the same string re-announces if count happens to match.
      statusRef.current.textContent = "";
      requestAnimationFrame(() => {
        if (statusRef.current) {
          statusRef.current.textContent =
            `${added} more titles loaded in ${title}. ${count} total.`;
        }
      });
    }
    prevCountRef.current = count;
  }, [totalCount, title]);

  // Passive scroll listener — fires when ~400 px from the trailing edge.
  // Uses addEventListener so { passive: true } can be set, preventing the
  // listener from ever blocking the arrow-key scroll path.
  const pageable = onScrollEnd != null;
  useEffect(() => {
    if (!pageable || !scrollRef.current) return;
    const el = scrollRef.current;

    const handleScroll = () => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 400) {
        onScrollEndRef.current?.();
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [pageable]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      el.scrollBy({ left: 200, behavior: "smooth" });
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      el.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  return (
    <section aria-labelledby={id} className="mb-8">
      {/* Visually hidden live region — announces new item counts to screen readers */}
      <p
        ref={statusRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <h2
        id={id}
        className="px-6 py-3 text-lg font-bold text-neutral-900 dark:text-white sticky top-16 z-10 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-sm"
      >
        {title}
      </h2>
      <div
        ref={scrollRef}
        className="overflow-x-auto"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <ul className={`flex gap-2 px-6 pb-4 ${big ? "min-h-125" : "min-h-70"}`}>
          {Children.map(children, (child, index) => (
            <li
              className={`flex-none ${big ? "w-85.5" : "w-46.25"}`}
              style={{ "--i": index } as CSSProperties}
            >
              {child}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
