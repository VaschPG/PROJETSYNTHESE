import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import LoadingButton from "./LoadingButton";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  return isLoading ? <LoadingButton /> : isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;
