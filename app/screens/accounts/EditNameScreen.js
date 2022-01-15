import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, Text, View } from "react-native";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import {
  SexyAppForm
} from "../../components/sexyForms";
import useAuth from "../../auth/useAuth";
import userApi from "../../api/user";

const validationSchema = Yup.object().shape({
  // enforce utf8 and no emojis?
  name: Yup.string().required().min(2).label("name"),
});


export default function EditNameScreen(props) {
  const auth = useAuth();
  
  const save = async (name) => {
    return await userApi.update({"name":name});
  };

  const handleResult = async (result) => {
    if (result) {
      if (result.ok && result.data) {
        console.log("result ok");
        console.log(result.data);
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
          name: {
            label: 'Name',
            value: auth.user.name,
            inputProps: {
              keyboardType: 'name-phone-pad',
              //autoCapitalize: 'none',
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
