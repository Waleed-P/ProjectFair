import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./bootstrap.min.css";
import ContextAPI from "./contexts/ContextAPI.jsx";
import TokenAuth from "./contexts/TokenAuth.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextAPI>
      <TokenAuth>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TokenAuth>
    </ContextAPI>
  </StrictMode>
);
