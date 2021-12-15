import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import * as Yup from "yup";

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
    const result = await authApi.login(email, password);
    if (!result.ok) {
      return setLoginFailed(true);
      }
    setLoginFailed(false);
    auth.logIn(result.data);
  };

  return (
    <Screen style={styles.container}>
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
          name="email"
          placeholder="Email"
          style={styles.TextInput}
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          style={styles.TextInput}
          textContentType="password"
        />
        <AppSubmitButton title="Login" />
      </AppForm>

      <TouchableOpacity>
        <Text style={styles.link_button}>Forgot Password?</Text>
      </TouchableOpacity>

    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    //backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  linkButton: {
    height: 30,
    marginBottom: 30,
  },
});

export default LoginScreen;
