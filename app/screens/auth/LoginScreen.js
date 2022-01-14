import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, Text, SafeAreaView, View } from "react-native";
import * as Yup from "yup";

import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import authApi from "../../api/auth";
import useAuth from "../../auth/useAuth";
import {
  SexyAppForm
} from "../../components/sexyForms";


const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

function LoginScreen(props) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const login = async (email, password) => {
    return await authApi.login(email, password);
  };

  const handleResult = async (result) => {
    if (result.ok && result.data) {
      setLoginFailed(false);
      auth.logIn(result.data);
    } else if (result.data) {
      setLoginFailed(true);
      if ("non_field_errors" in result.data) {
        throw new Error(result.data.non_field_errors[0]);
      }
      // TODO Else look for field error by key
    } else {
      setLoginFailed(true);
      throw new Error("Something went wrong");
    }
  };

  return (
    <Screen style={styles.container} >
      <Image style={styles.logo} source={require("../../assets/logo.png")} />

    <SexyAppForm
    action={login}
    afterSubmit={handleResult}
    buttonText="Submit"
    validationSchema = {validationSchema}
    fields={{
      email: {
        label: 'Email',
        inputProps: {
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          autoCorrect: false,
        },
      },
      password: {
        label: 'Password',
        inputProps: {
          secureTextEntry: true,
          autoCapitalize: 'none',
          autoCorrect: false,
        },
      },
    }}
  />

      <TouchableOpacity onPress={() => props.navigation.navigate(routes.FORGOT_PASSWORD)}>
        <Text style={styles.alternativeOptionText}>Forgot Password?</Text>
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
  },  
  image: {
    marginBottom: 30,
  },
  alternativeOptionText: {
    position:"absolute",
    alignSelf: "center",
    bottom:120,
  }
});

export default LoginScreen;
