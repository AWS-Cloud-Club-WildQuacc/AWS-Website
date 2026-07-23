import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const loader = document.getElementById("boot-loader");
const loaderStartedAt = performance.now();
const loaderStatus = loader?.querySelector(".boot-loader__status");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const progressDuration = prefersReducedMotion ? 0 : 1150;
let loaderFallback;
let completionTimer;

function dismissLoader() {
  if (!loader || loader.dataset.dismissed === "true") return;

  loader.dataset.dismissed = "true";
  document.body.classList.remove("boot-loading");
  loader.classList.add("boot-loader--leaving");

  window.setTimeout(() => loader.remove(), prefersReducedMotion ? 0 : 420);
  window.clearTimeout(completionTimer);
  window.clearTimeout(loaderFallback);
}

function completeLoader({ immediate = false } = {}) {
  if (!loader || loader.dataset.completed === "true") return;

  const elapsed = performance.now() - loaderStartedAt;
  const remaining = immediate ? 0 : Math.max(0, progressDuration - elapsed);

  completionTimer = window.setTimeout(() => {
    if (!loader || loader.dataset.completed === "true") return;

    loader.dataset.completed = "true";
    loader.classList.add("boot-loader--complete");
    if (loaderStatus) loaderStatus.textContent = "CLOUD READY!";

    window.setTimeout(dismissLoader, prefersReducedMotion ? 0 : 280);
  }, remaining);
}

// Never trap visitors behind the loader if application startup is interrupted.
loaderFallback = window.setTimeout(() => completeLoader({ immediate: true }), 4000);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Two paint frames ensure the first application frame exists before the overlay leaves.
window.requestAnimationFrame(() => {
  window.requestAnimationFrame(completeLoader);
});
