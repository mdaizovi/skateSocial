import settings from "../config/settings";
import client from './client';
const login = (email, password) => client.post(settings.logInURL, {email, password});

export default {
    login,
};