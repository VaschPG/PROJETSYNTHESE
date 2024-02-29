import React from "react";
import ReactDOM from "react-dom/client";
import ExercisePlan from "./pages/ExercisePlan/ExercisePlan";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Menu from "./components/Menu";
import ProfilePage from "./pages/Profile/ProfilePage";
import Inscription from "./pages/Inscription/Inscription";
import { Auth0Provider } from "@auth0/auth0-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      {
        path: "exercise",
        element: <ExercisePlan />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/inscription",
    element: <Inscription />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-rekba4e7mrcfdxqe.us.auth0.com"
      clientId="c8ZkUTknic6Z9KLRansymHxFV3L0CfaF"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
    ,
  </React.StrictMode>
);
