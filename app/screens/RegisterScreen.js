import React, { useState} from "react";
import { StyleSheet,  Text } from "react-native";
import * as Yup from "yup";

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
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password1"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password2"
            placeholder="Password (again)"
            secureTextEntry
            textContentType="password"
          />
          <AppSubmitButton title="Register" />
        </AppForm> 
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
