import { withData } from "./state";
import { Main } from "./components/Main";
import Home from "./pages/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Spinner } from "components/Spinner";

function App() {
  return (
    <Main>
      <Router>
        <h1>Welcome home...</h1>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/spinner" exact>
            <Spinner />
          </Route>
        </Switch>
      </Router>
    </Main>
  );
}

export default withData(App);
