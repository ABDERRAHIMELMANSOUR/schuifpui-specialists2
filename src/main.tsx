import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppProviders, AppRoutes } from "./App";
import "./index.css";

const app = (
  <StrictMode>
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  </StrictMode>
);

const container = document.getElementById("root")!;

// In productie is de HTML al geprerenderd (scripts/prerender.mjs), dus
// hydrateren we die markup. Op de dev-server is #root leeg en renderen we
// gewoon vanaf nul.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
