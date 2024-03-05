import ReactDOM from "react-dom/client";
import ExercisePlan from "./pages/ExercisePlan/ExercisePlan";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "./components/Menu";
import ProfilePage from "./pages/Profile/ProfilePage";
import { Auth0Provider } from "@auth0/auth0-react";
import LoginExemple from "./pages/Login/LoginExemple";
import ProgressChart from "./pages/Profile/components/ProgressChart";

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
      {
        path: "login",
        element: <LoginExemple />,
      },
      {
        path: "progresschart",
        element: <ProgressChart />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginExemple />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain='dev-rekba4e7mrcfdxqe.us.auth0.com'
    clientId='c8ZkUTknic6Z9KLRansymHxFV3L0CfaF'
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);
