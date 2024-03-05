import { useAuth0 } from "@auth0/auth0-react";

const VITE_API_PROFILE_URL = import.meta.env.VITE_API_PROFILE_URL;
const VITE_BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

// JUST A EXAMPLE TO UNDERSTAND OR TEST HOW TO USE AUTH0
// CAN DELETE AFTER USING IT IN OTHER PAGES
const LoginExemple = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  //EXEMPLE de fetch : insere un id dans la collections Profiles
  //DOIT AJOUTER UN CHECK SI UN PROFILE AVEC CET ID EXISTE DEJA -> NE AJOUTE PAS-> Do that in back end not front end
  //DOIT creer plusieurs autres routes et methodes pour updater le profile ou checker si un profile existe
  fetch(VITE_BASE_API_URL + VITE_API_PROFILE_URL + "insertId/" + user?.sub?.substring(user?.sub.indexOf("|") + 1), {
    method: "POST",
  })
    .then((response) => response.text()) // Read response as text
    .then((data) => console.log(data)); // Alert the response

  return (
    <>
      {isAuthenticated ? (
        <div>
          <img src={user?.picture} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <div color='black'>{user?.sub?.substring(user?.sub.indexOf("|") + 1)}</div>
        </div>
      ) : (
        <div>N'est pas logged in</div>
      )}
    </>
  );
};

export default LoginExemple;
