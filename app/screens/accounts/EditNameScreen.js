import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, Text, View } from "react-native";
import * as Yup from "yup";

import colors from "../../config/colors";
import Screen from "../../components/Screen";
import {
  AppErrorMessageText,
  AppForm,
  AppFormField,
  AppSubmitButton,
} from "../../components/forms";
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
  const [error, setError] = useState();

  const handleSubmit = async ({name}) => {
    setSaveAttempted(true);
    const result = await userApi.update({"name":name});
    if (!result.ok) {
      if (result.data) setError(result.data.name);
      return setSaveFailed(true);
      }
    setSaveFailed(false);
    auth.updateUser(result.data);
  };

  return (
    <Screen style={styles.container} >

    {saveAttempted && !saveFailed ? (
				<Text>Saved!!!</Text>
			) : (
				<>
        <AppForm
          initialValues={{ name: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppErrorMessageText
            error={error} visible={error}
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            label="Name"
            name="name"
            placeholder="your name"
          />

          <View style={styles.buttonsContainer}>
            <AppSubmitButton title="Save" />
          </View>  
        </AppForm>

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
  buttonsContainer: {
    paddingHorizontal:40,
    width: "100%",
    position:"absolute",
    bottom:125,
  },  
});
