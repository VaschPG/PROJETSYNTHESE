import "./ProfilePage.css";
import PersonalInfo from "./components/PersonalInfoForm/PersonalInfo";
import ProgressChart from "./components/Progression/ProgressChart";
import Goals from "./components/Goals/Goals";
import { useAuth0 } from "@auth0/auth0-react";

function ProfilePage() {
  const { isAuthenticated, user } = useAuth0();
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
                <PersonalInfo />
              </div>
              <div className="left-section-bottom">
                <h1 className="h1">Progression</h1>
                <ProgressChart auth_id={user?.sub?.substring(user?.sub.indexOf("|") + 1)} />
              </div>
            </div>
            <div className="right-section">
              <h1 className="h1">Vos objectifs</h1>
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
