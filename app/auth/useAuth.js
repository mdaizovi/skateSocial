import { useContext } from "react";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (data) => {
    //const user = {"first_name":"Mic", "email":"mdaizovi@gmail.com", "username":"MickeyD"}
    // TODO handle access/refresh?
    const authToken = data.tokens.access
    const user = data.user
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    // is there any benefit to logging out via api? prob not?
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
