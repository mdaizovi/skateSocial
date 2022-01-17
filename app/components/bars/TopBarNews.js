import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class TopBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftButton}>
          <Text style={styles.buttonText}>
            <MaterialCommunityIcons name="filter" size={40}/>
          </Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.middleButton}>
          <Text style={styles.buttonText}>
            <MaterialCommunityIcons name="calendar-plus" size={40}/>
          </Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.rightButton}>
          <Text style={styles.buttonText}>
          <MaterialCommunityIcons name="bell-circle" size={40}/>
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    height: 52,
    marginLeft: -20,
    marginRight:-20,
    flexDirection: "row", // row
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "space-between", // center, space-around
    paddingLeft: 20,
    paddingRight: 20,
  },
});
