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
    value["logInURL"] = value["BackendUrl"] + "auth/login/";
    value["RegisterURL"] = value["BackendUrl"] + "auth/registration/";
    value["logOutURL"] = value["BackendUrl"] + "auth/logout/";
  }

const getCurrentSettings = () => {
    if (__DEV__) return settings.dev;
    if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
    return settings.prod;
}

export default getCurrentSettings();