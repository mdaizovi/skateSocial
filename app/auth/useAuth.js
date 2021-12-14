import { useContext } from "react";


import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = () => {
    // TODO api log in
    const user = {"first_name":"Mic", "email":"mdaizovi@gmail.com", "username":"MickeyD"}
    const authToken = "token"
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    console.log("logging out")
    // is there any benefit to logging out via api? prob not?
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
