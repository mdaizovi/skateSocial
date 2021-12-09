import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import authApi from './app/api/auth';
import {appUserContext} from './app/context/appUserContext';

import LoginScreen from './app/screens/loginScreen'
import GlobalState from './app/context/globalState';

export default class App extends React.Component{
 render(){
  return(
   <GlobalState>
    <View style={styles.container}>
     <LoginScreen />
    </View>
   </GlobalState>
  );
 }
}
const styles = StyleSheet.create({
 container: {
  flex: 1,
  flexDirection:'column',
 }
});