import Constants from 'expo-constants'

const settings = {
    
    dev: {
        BackendUrl: "http://127.0.0.1:8000/api/",
    },
    staging: {
        BackendUrl: "https://www.oldiesinanotherroom.com/api/", // change me, obviously
    },
    prod: {
        BackendUrl: "https://www.oldiesinanotherroom.com/api/", // change me, obviously
    },
}
for (const [key, value] of Object.entries(settings)) {
    value["logInURL"] = value["BackendUrl"] + "v1/auth/login/";
    value["logOutURL"] = value["BackendUrl"] + "v1/auth/logout/";
    value["RegisterURL"] = value["BackendUrl"] + "v1/auth/registration/";
    value["UserUpdateURL"] = value["BackendUrl"] + "v1/auth/user/";

    value["SearchURL"] = value["BackendUrl"] + "v1/search/";

    value["ResendConfirmationEmailURL"] = value["BackendUrl"] + "v1/auth/registration/resend-email/";


  }

const getCurrentSettings = () => {
    if (__DEV__) return settings.dev;
    if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
    return settings.prod;
}

export default getCurrentSettings();