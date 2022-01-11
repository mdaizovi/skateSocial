import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import SearchLocalScreen from "../screens/SearchLocalScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator 
  // ugly, i just want to see it change for now
  tabBarOptions={{
    activeBackgroundColor:"black",
    activeTintColor: '#81B247',
  }}
  >
    <Tab.Screen
      name="Feed"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchLocalScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="map-marker-question"
            color={color}
            size={size}
          />
      ),
    }}
    />
    <Tab.Screen
      name="Me"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
