import * as ReactDOM from "react-dom";
import App from "./App";

const rootElement = document.getElementById("root");
// This opts into the new behavior!
// @ts-expect-error
ReactDOM.createRoot(rootElement).render(<App />);
