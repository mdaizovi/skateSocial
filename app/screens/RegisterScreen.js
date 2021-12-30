import React, { useState} from "react";
import { StyleSheet,  Text, View } from "react-native";
import * as Yup from "yup";

import colors from "../config/colors";
import Screen from "../components/Screen";
import registerApi from "../api/registration";
import useAuth from "../auth/useAuth";
import {
  AppErrorMessageText,
  AppForm,
  AppFormField,
  AppSubmitButton,
} from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password1: Yup.string().required().min(8).label("Password"),
  password2: Yup.string().required().min(8).label("Password (again)"),
});

function RegisterScreen() {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.register(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
      }
      return setLoginFailed(true);
    }
    setLoginFailed(false);
    auth.logIn(result.data);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading} />
      <Screen style={styles.container}>
        <AppForm
          initialValues={{email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppErrorMessageText error={error} visible={error} />
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
            name="password1"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            label = "Password (again)"
            name="password2"
            placeholder="Password (again)"
            secureTextEntry
            textContentType="password"
          />
        <View style={styles.buttonsContainer}>
          <AppSubmitButton title="Register" color= "secondary" />
        </View>  
        </AppForm> 
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonsContainer: {
    paddingHorizontal:40,
    width: "100%",
    bottom:30,
  },  
});

export default RegisterScreen;
