import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from 'expo-app-loading';

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
// import * as Location from 'expo-location';
// import * as Permissions from "expo-permissions";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
    const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
  return (
    <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)}
      onError={console.warn} />
  );

  // const requestPermission = async () => {
  //   // Get location permission
  //   const result = Permissions.askAsync(Permissions.LOCATION_FOREGROUND, Permissions.LOCATION_BACKGROUND,Permissions.MEDIA_LIBRARY);
  //   // result.granted if user granted all permissions
  //   if (!result.granted)
  //     alert('Please enable location services to find local skaters and spots')
  // }
  // // giving useEffect [] means it will get executed only once
  // useEffect(()=>{
  //   //requestPermission();

  // }, [])
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );

}
