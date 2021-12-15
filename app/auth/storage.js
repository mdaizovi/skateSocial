import * as SecureStore from "expo-secure-store";

const key = "authToken";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const storeUser = async (user) => {
  try {

    await SecureStore.setItemAsync('user',JSON.stringify(user));
  } catch (error) {
    console.log("Error storing the user", error);
  }
};

const getUser = async () => {
  try {
    const user = await SecureStore.getItemAsync("user");
    return JSON.parse(user);
  } catch (error) {
    console.log("Error getting the user", error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync("user");
  } catch (error) {
    console.log("Error removing the user", error);
  }
};

export default { getToken, getUser, removeToken, storeToken, storeUser, removeUser };
