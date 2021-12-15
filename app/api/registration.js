import settings from "../config/settings";
import client from "./client";

const register = (userInfo) => client.post(settings.RegisterURL, userInfo);

export default { 
    register,
};
