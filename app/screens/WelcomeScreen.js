import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import colors from "../config/colors";

import Button from "../components/Button";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.tagline}>Skate Crew</Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonStyle}>
          <Button
            title="Login"
            onPress={() => navigation.navigate(routes.LOGIN)}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            style={styles.buttonStyle}
            title="Register"
            color="secondary"
            onPress={() => navigation.navigate(routes.REGISTER)}
          />
         </View> 
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    paddingHorizontal:40,
    width: "100%",
    bottom:75,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoContainer: {
    position: "absolute",
    top: 150,
    alignItems: "center",
  },
  tagline: {
    fontSize: 35,
    fontWeight: "600",
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
