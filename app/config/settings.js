import Constants from 'expo-constants'

const settings = {
    
    dev: {
        BackendUrl: "http://127.0.0.1:8000/api",
    },
    staging: {
        BackendUrl: "https://www.oldiesinanotherroom.com/api", // change me, obviously
    },
    prod: {
        BackendUrl: "https://www.oldiesinanotherroom.com/api", // change me, obviously
    },
}

const getCurrentSettings = () => {
    if (__DEV__) return settings.dev;
    if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
    return settings.prod;
}

export default getCurrentSettings();