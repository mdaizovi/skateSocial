import React, { useState} from "react";
import { StyleSheet, Text, TouchableOpacity} from "react-native";
import * as Yup from "yup";

import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import registerApi from "../../api/registration";
import useAuth from "../../auth/useAuth";
import {
  SexyAppForm
} from "../../components/sexyForms";
import ActivityIndicator from "../../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password1: Yup.string().required().min(8).label("Password"),
  password2: Yup.string().required().min(8).label("Password (again)").oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function RegisterScreen(props) {
  const auth = useAuth();

  //const register = async (email, password) => {
  const register = async ({userInfo}) => {
    //return await registerApi.register(email, password);
    return await registerApi.register(userInfo);
  };

  const handleResult = async (result) => {
    if (result) {
      if (result.ok && result.data) {
        auth.logIn(result.data);
      }
    }
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading} />

      <Screen style={styles.container}>

      <SexyAppForm
        action={register}
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
          password1: {
            label: 'Password',
            inputProps: {
              secureTextEntry: true,
              autoCapitalize: 'none',
              autoCorrect: false,
            },
          },
          password2: {
            label: 'Password (again)',
            inputProps: {
              secureTextEntry: true,
              autoCapitalize: 'none',
              autoCorrect: false,
            },
          },          
        }}
      />

        <TouchableOpacity onPress={() => props.navigation.navigate(routes.LOGIN)}>
        <Text style={styles.alternativeOptionText}>Login</Text>
      </TouchableOpacity>

      </Screen>
    </>
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
  buttonsContainer: {
    paddingHorizontal:40,
    width: "100%",
    position:"absolute",
    bottom:125,
  }, 
  alternativeOptionText: {
    position:"absolute",
    alignSelf: "center",
    bottom:120,
  }    
});

export default RegisterScreen;
