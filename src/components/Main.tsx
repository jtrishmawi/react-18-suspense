import { PropsWithChildren } from "react";

export const Main = ({ children }: PropsWithChildren) => (
  <main
    id="main-content"
    className="min-h-screen pt-16 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300"
  >
    {children}
  </main>
);
