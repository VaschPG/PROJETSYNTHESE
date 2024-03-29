import "./ProfilePage.css";
import PersonalInfo from "./components/PersonalInfoForm/PersonalInfo";
import Goals from "./components/Goals/Goals";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingPage from "../Login/LoadingPage";
import Calcul from "./components/Calcul/Calcul";
import { lazy, Suspense } from "react";

//Lazy loading
const ProgressChart = lazy(() => import("./components/Progression/ProgressChart"));

function ProfilePage() {
  const { isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      {isAuthenticated ? (
        <div className="profile-page">
          <div className="profile-navbar">
            <h1>Votre Profil</h1>
          </div>
          <div className="profile-sections">
            <div className="left-section">
              <div className="left-section-top">
                <div className="left-section-top-left">
                  <PersonalInfo />
                </div>
                <div className="left-section-top-right">
                  <Calcul />
                </div>
              </div>
              <div className="left-section-bottom">
                <h1 className="h1">Progression</h1>
                <Suspense fallback={<LoadingPage />}>
                  <ProgressChart auth_id={user?.sub?.substring(user?.sub.indexOf("|") + 1)} />
                </Suspense>
              </div>
            </div>
            <div className="right-section">
              <Goals />
            </div>
          </div>
        </div>
      ) : (
        /*Temporary, eventually probably redirect to login if not authenticated? */
        <div className="profile-page-not-auth">
          <h1 className="h1-center">Veuillez vous connecter pour voir ce contenu.</h1>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
