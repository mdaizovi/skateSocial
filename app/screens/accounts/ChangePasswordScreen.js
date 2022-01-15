import React from "react";
import { StyleSheet} from "react-native";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import {
  SexyAppForm
} from "../../components/sexyForms";
import authApi from "../../api/auth";

const validationSchema = Yup.object().shape({
  new_password1: Yup.string().required().min(8).label("Password"),
  new_password2: Yup.string().required().min(8).label("Password").oneOf([Yup.ref('new_password1'), null], 'Passwords must match'),
});

export default function ChangePasswordScreen(props) {

  const save = async (new_password1, new_password2) => {
    return await authApi.changePassword(new_password1, new_password2);
  };

 
  return (
    <Screen style={styles.container} >
      <SexyAppForm
        action={save}
        buttonText="Save"
        validationSchema = {validationSchema}
        fields={{
          new_password1: {
            label: 'Password',
            inputProps: {
              secureTextEntry: true,
              autoCapitalize: 'none',
              autoCorrect: false,
            },
          },
          new_password2: {
            label: 'Password (again)',
            inputProps: {
              secureTextEntry: true,
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
