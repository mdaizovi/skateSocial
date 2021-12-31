import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, Text, View } from "react-native";
import * as Yup from "yup";

import colors from "../config/colors";
import Screen from "../components/Screen";
import {
  AppErrorMessageText,
  AppForm,
  AppFormField,
  AppSubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

function LoginScreen(props) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    console.log("handle submit")
    const result = await authApi.login(email, password);
    if (!result.ok) {
      return setLoginFailed(true);
      }
    setLoginFailed(false);
    auth.logIn(result.data);
  };

  return (
    <Screen style={styles.container} >
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppErrorMessageText
          error="Invalid email and/or password."
          visible={loginFailed}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          label="Email"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          label="Password"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />

        <View style={styles.buttonsContainer}>
          <AppSubmitButton title="Login" />
        </View>  
      </AppForm>

      <TouchableOpacity>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>

    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    top: 20,
    width: "100%",
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  buttonsContainer: {
    paddingHorizontal:40,
    width: "100%",
    position:"absolute",
    bottom:125,
  },  
  image: {
    marginBottom: 30,
  },
});

export default LoginScreen;
