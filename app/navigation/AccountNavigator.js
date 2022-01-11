import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MessagesScreen from "../screens/MessagesScreen";

import {AccountScreen, UserDetailsEditScreen, EditNameScreen, EditUsernameScreen, ChangeEmailScreen, ChangePasswordScreen  } from '../screens/accounts/';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="UserDetailsEdit" component={UserDetailsEditScreen} 
      options={{ title: "My Details" }} 
    />

    <Stack.Screen name="EditName" component={EditNameScreen} 
      options={{ title: "Edit Name" }} 
    />
    <Stack.Screen name="EditUsername" component={EditUsernameScreen} 
      options={{ title: "Edit Username" }} 
    />    
    <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} 
      options={{ title: "Change Email" }} 
    />
    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} 
      options={{ title: "Change Password" }} 
    />

  </Stack.Navigator>
);

export default AccountNavigator;
