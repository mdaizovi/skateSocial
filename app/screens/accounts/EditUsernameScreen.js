import React from "react";
import { StyleSheet} from "react-native";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import {
  SexyAppForm
} from "../../components/sexyForms";
import useAuth from "../../auth/useAuth";
import userApi from "../../api/user";

const validationSchema = Yup.object().shape({
  // enforce utf8 and no emojis?
  username: Yup.string().required().min(5).label("username"),
});

export default function EditUsernameScreen(props) {
  const auth = useAuth();

  const save = async (username) => {
    return await userApi.update({"username":username});
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
          username: {
            label: 'Username',
            value: auth.user.username,
            inputProps: {
              keyboardType: 'name-phone-pad',
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