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
  const [saveAttempted, setSaveAttempted] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  const save = async (name) => {
    return await userApi.update({"name":name});
  };

  const handleResult = async (result) => {
    setSaveAttempted(true);
    if (result) {
      if (result.ok && result.data) {
        setSaveFailed(false);
        auth.updateUser(result.data);
      } else if (result.data) {
        setError(result.data.name);
        setSaveFailed(true);
        if ("non_field_errors" in result.data) {
          throw new Error(result.data.non_field_errors[0]);
        }
        // TODO Else look for field error by key
        
      } else {
        setSaveFailed(true);
        throw new Error("Something went wrong");
      }
    } else {
      setSaveFailed(true);
      throw new Error("Something went wrong");
    }
  };


  return (
    <Screen style={styles.container} >

    {saveAttempted && !saveFailed ? (
				<Text>Saved!!!</Text>
			) : (
				<>
          <SexyAppForm
            action={save}
            afterSubmit={handleResult}
            buttonText="Save"
            validationSchema = {validationSchema}
            fields={{
              name: {
                label: 'Name',
                inputProps: {
                  keyboardType: 'name-phone-pad',
                  //autoCapitalize: 'none',
                  autoCorrect: false,
                },
              },
            }}
        />

			  </>
			)}

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
