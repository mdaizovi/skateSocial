import Constants from 'expo-constants'
import settings from "../secrets";

for (const [key, value] of Object.entries(settings)) {
    value["logInURL"] = value["BackendUrl"] + "v1/auth/login/";
    value["logOutURL"] = value["BackendUrl"] + "v1/auth/logout/";
    value["RegisterURL"] = value["BackendUrl"] + "v1/auth/registration/";
    value["UserUpdateURL"] = value["BackendUrl"] + "v1/auth/user/";

    value["sendResetPasswordEmailURL"] = value["BackendUrl"] + "v1/auth/registration/password/reset/";
    value["changePasswordURL"] = value["BackendUrl"] + "v1/auth/password/change/";
    value["changeEmailURL"] = value["BackendUrl"] + "v1/auth/email/change/";
    value["ResendConfirmationEmailURL"] = value["BackendUrl"] + "v1/auth/registration/email/confirmation-resend/";

    value["SearchURL"] = value["BackendUrl"] + "v1/search/";

  }

const getCurrentSettings = () => {
    if (__DEV__) return settings.dev;
    if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
    return settings.prod;
}

export default getCurrentSettings();