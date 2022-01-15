import settings from "../config/settings";
import client from './client';

const login = (email, password) => client.post(settings.logInURL, {email, password});
const resendEmailConfirmation = (email) => client.post(settings.ResendConfirmationEmailURL, {'email':email});
const sendResetPasswordEmail = (email) => client.post(settings.sendResetPasswordEmailURL, {'email':email});
const changeEmail = (email) => client.post(settings.changeEmailURL, {'email':email});
const changePassword = (new_password1, new_password2) => client.post(settings.changePasswordURL, {new_password1, new_password2});


export default {
    login,
    resendEmailConfirmation,
    sendResetPasswordEmail,
    changePassword,
    changeEmail,
};