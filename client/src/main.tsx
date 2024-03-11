import ReactDOM from "react-dom/client";
import ExercisePlan from "./pages/ExercisePlan/ExercisePlan";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "./components/Menu";
import ProfilePage from "./pages/Profile/ProfilePage";
import { Auth0Provider } from "@auth0/auth0-react";
import { StrictMode } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      {
        index: true,
        element: <ExercisePlan />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-rekba4e7mrcfdxqe.us.auth0.com"
      clientId="c8ZkUTknic6Z9KLRansymHxFV3L0CfaF"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </StrictMode>
);
