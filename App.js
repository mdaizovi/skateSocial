import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import authApi from './app/api/auth';
import {appUserContext} from './app/context/appUserContext';

import TaskList from './app/components/taskList'
import Footer from './app/components/footer';
import GlobalState from './app/context/globalState';

export default class App extends React.Component{
 render(){
  return(
   <GlobalState>
    <View style={styles.container}>
      <Footer/>
     <TaskList />
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