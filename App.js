import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";

// import authApi from './app/api/auth';
// import {AppUserContext} from './app/context/AppUserContext';
// import LoginScreen from './app/screens/LoginScreen'
// import GlobalState from './app/context/GlobalState';

export default function App() {
    return (
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
    );
  }
  
// export default class App extends React.Component{
//  render(){
//   return(
//    <GlobalState>
//     <View style={styles.container}>
//      <LoginScreen />
//     </View>
//    </GlobalState>
//   );
//  }
// }
const styles = StyleSheet.create({
 container: {
  flex: 1,
  flexDirection:'column',
 }
});