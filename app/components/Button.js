import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, color="primary" }) {
  return (
    <View style={styles.buttonStyle}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors[color] }]}
        onPress={onPress}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
