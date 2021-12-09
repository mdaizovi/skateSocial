import React from 'react';
import {appUserContext} from '../context/appUserContext';
import { StyleSheet, Text, View } from 'react-native';

class mainApp extends React.Component {
    render() {
      let props = this.props;
      let context = this.context;
      return (

        <View style={styles.container}>
        <Text>Here is some text</Text>
        {context.user==={} ? <Text>no user</Text> : <Text>User!</Text>}
        </View>
      );
    }
  }
  mainApp.contextType = appUserContext;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  
  export default mainApp;