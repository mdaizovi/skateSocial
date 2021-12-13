import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';


// import authApi from './app/api/auth';
// import {AppUserContext} from './app/context/AppUserContext';

// import LoginScreen from './app/screens/LoginScreen'
// import GlobalState from './app/context/GlobalState';
import Screen from './app/components/Screen';

const Tweets = ({navigation}) => (
    <Screen>
        <Text>Tweets</Text>
        <Button
        title="View Tweet"
        onPress={() => navigation.navigate("TweetDetails")}
        />

    </Screen>
)
const TweetDetails = () => (
    <Screen>
        <Text>Tweet Details</Text>
    </Screen>
)

const Stack = createStackNavigator();
const StackNavigator = () => (
    <Stack.Navigator initialRouteName="Tweets">
        <Stack.Screen name="Tweets" component={Tweets}/>
        <Stack.Screen name="TweetDetails" options={{title: "Tweet Details"}} component={TweetDetails}/>
    </Stack.Navigator>
) 

export default function App() {
    return(
        <NavigationContainer>
            <StackNavigator/>
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