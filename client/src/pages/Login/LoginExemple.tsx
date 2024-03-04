import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

// JUST A EXAMPLE TO UNDERSTAND OR TEST HOW TO USE AUTH0
// CAN DELETE AFTER USING IT IN OTHER PAGES
const LoginExemple = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    )
  );
};

export default LoginExemple;
