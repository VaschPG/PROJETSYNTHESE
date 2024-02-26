import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/ExercisePlan/ExercisePlan";
import "./index.css";
import Menu from "./components/Menu";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Menu />
    <App />
  </React.StrictMode>
);
