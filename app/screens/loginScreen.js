import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, Text, View } from "react-native";
import * as Yup from "yup";

import colors from "../config/colors";
import Screen from "../components/Screen";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import { validateContent, validateLength } from '../components/sexyForms/SexyAppFormValidation';
import {
  SexyAppForm
} from "../components/sexyForms";


const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

function LoginScreen(props) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const login = async (email, password) => {
    console.log("new login");
    console.log(email);
    console.log(password);
    return result = await authApi.login(email, password);
  };

  const handleResult = async (result) => {
    console.log("Handle result");
    console.log(result.data);
    if (result.ok && result.data) {
      setLoginFailed(false);
      auth.logIn(result.data);
    } else if (result.status === 401) {
      console.log(401)
      setLoginFailed(true);
      throw new Error(result.data.non_field_errors[0]);
    } else {
      console.log("other error")
      setLoginFailed(true);
      throw new Error(result.data.non_field_errors[0]);
    }
  
  };

  return (
    <Screen style={styles.container} >
      <Image style={styles.logo} source={require("../assets/logo.png")} />

    <SexyAppForm

    action={login}
    afterSubmit={handleResult}
    buttonText="Submit"
    fields={{
      email: {
        label: 'Email',
        validators: [validateContent],
        inputProps: {
          keyboardType: 'email-address',
        },
      },
      password: {
        label: 'Password',
        validators: [validateContent, validateLength],
        inputProps: {
          secureTextEntry: true,
        },
      },
    }}
  
  />

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
