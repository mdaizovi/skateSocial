import settings from "../config/settings";
import client from './client';

const login = (email, password) => client.post(settings.logInURL, {email, password});
const resendEmailConfirmation = (email) => client.post(settings.ResendConfirmationEmailURL, {'email':email});
const sendResetPasswordEmail = (email) => client.post(settings.sendResetPasswordEmailURL, {'email':email});

export default {
    login,
    resendEmailConfirmation,
    sendResetPasswordEmail,
};