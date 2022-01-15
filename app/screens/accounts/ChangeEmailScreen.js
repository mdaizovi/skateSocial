import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, Text, View } from "react-native";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import {
  SexyAppForm
} from "../../components/sexyForms";
import useAuth from "../../auth/useAuth";
import authApi from "../../api/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});


export default function ChangeEmailScreen(props) {
  const auth = useAuth();
  
  const save = async (email) => {
    return await authApi.changeEmail(email);
  };

  const handleResult = async (result) => {
    if (result) {
      if (result.ok && result.data) {
        auth.updateUser(result.data);
      } 
    } 
  };


  return (
    <Screen style={styles.container} >
      <SexyAppForm
        action={save}
        afterSubmit={handleResult}
        buttonText="Save"
        validationSchema = {validationSchema}
        fields={{
          email: {
            label: 'Email',
            value: auth.user.email,
            inputProps: {
              keyboardType: 'email-address',
              autoCapitalize: 'none',
              autoCorrect: false,
            },
          },
        }}
      />
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
});
