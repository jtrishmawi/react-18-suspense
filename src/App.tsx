import { PropsWithChildren, Suspense } from "react";
import { withData } from "./state";
import { Main } from "./components/Main";
import { Navbar } from "./components/Navbar";
import { Spinner } from "./components/Spinner";
import Home from "./pages/Home";
import { useTheme } from "./hooks/useTheme";
import { ThemeContext } from "./hooks/useThemeContext";
import HomeErrorBoundary from "./errors/HomeErrorBoundary";
import { configResource } from "helpers/api";

function ConfigGate({ children }: PropsWithChildren) {
  configResource.read();
  return <>{children}</>;
}

function App() {
  const theme = useTheme();

  return (
    <ThemeContext.Provider value={theme}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navbar />
      <Main>
        <HomeErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <ConfigGate>
              <Home />
            </ConfigGate>
          </Suspense>
        </HomeErrorBoundary>
      </Main>
    </ThemeContext.Provider>
  );
}

export default withData(App);
