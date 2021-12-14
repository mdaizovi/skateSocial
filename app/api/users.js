import client from "./client";
import settings from "../config/settings";

const register = (userInfo) => client.post(settings.RegisterURL, userInfo);

export default { register };
