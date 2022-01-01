import { useContext } from "react";
import cache from "../utility/cache";
import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (data) => {
    //const user = {"first_name":"Mic", "email":"mdaizovi@gmail.com", "username":"MickeyD"}
    // TODO handle access/refresh?
    const authToken = data.tokens.access
    const user = data.user
    authStorage.storeUser(user);
    authStorage.storeToken(authToken);
    
    setUser(user);
  };

  const logOut = () => {
    // is there any benefit to logging out via api? prob not?
    setUser(null);
    authStorage.removeToken();
    authStorage.removeUser();
  };

  const updateUser = (data) => {
    const user = data
    authStorage.storeUser(user);
    setUser(user);
  };

  return { user, logIn, logOut, updateUser };
};
