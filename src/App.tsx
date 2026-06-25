import { withData } from "./state";
import { Main } from "./components/Main";
import Home from "./pages/Home";

function App() {
  return (
    <Main>
      <h1>Welcome home...</h1>
      <Home />
    </Main>
  );
}

export default withData(App);
