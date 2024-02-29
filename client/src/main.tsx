import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/ExercisePlan/ExercisePlan";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/inscription" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
