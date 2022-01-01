import settings from "../config/settings";
import client from "./client";

const update = (payload) => client.patch(settings.UserUpdateURL, payload);

export default { 
    update,
};
