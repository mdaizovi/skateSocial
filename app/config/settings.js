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
    value["RegisterURL"] = value["BackendUrl"] + "v1/auth/registration/";
    value["logOutURL"] = value["BackendUrl"] + "v1/auth/logout/";

    value["SearchURL"] = value["BackendUrl"] + "v1/search/";

    value["MakeFriendRequestURL"] = value["BackendUrl"] + "v1/network/friends/add/";// add the friend id
    value["FriendRequestRespondURL"] = value["BackendUrl"] + "v1/network/friend-request/respond/"; // add friend request id
    value["FriendRequestCancelURL"] = value["BackendUrl"] + "v1/network/friend-request/cancel/"; // (del) add friend request id
    value["UnfriendURL"] = value["BackendUrl"] + "v1/network/friends/remove/"; // (del) friendship id

  }

const getCurrentSettings = () => {
    if (__DEV__) return settings.dev;
    if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
    return settings.prod;
}

export default getCurrentSettings();