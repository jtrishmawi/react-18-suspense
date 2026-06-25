import { Children, CSSProperties, KeyboardEvent, PropsWithChildren, useId } from "react";

interface Props {
  big?: boolean;
  title: string;
}

export const PostersRow = ({
  title,
  big,
  children,
}: PropsWithChildren<Props>) => {
  const id = useId();

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
      <h2
        id={id}
        className="px-6 py-3 text-lg font-bold text-neutral-900 dark:text-white sticky top-16 z-10 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-sm"
      >
        {title}
      </h2>
      <div
        className="overflow-x-auto"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <ul className={`flex gap-2 px-6 pb-4 ${big ? "min-h-[500px]" : "min-h-[280px]"}`}>
          {Children.map(children, (child, index) => (
            <li
              className={`flex-none ${big ? "w-[342px]" : "w-[185px]"}`}
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
