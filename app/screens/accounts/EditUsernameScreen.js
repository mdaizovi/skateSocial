import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import {
  SexyAppForm
} from "../../components/sexyForms";
import {getInitialState} from '../../components/sexyForms/SexyAppFormValidation';
import useAuth from "../../auth/useAuth";
import userApi from "../../api/user";

const validationSchema = Yup.object().shape({
  // enforce utf8 and no emojis?
  username: Yup.string().required().min(5).label("username"),
});

export default function EditUsernameScreen(props) {
  const auth = useAuth();
  const [saveAttempted, setSaveAttempted] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  const fieldKeys = ["username"];
  const [validationErrors, setValidationErrors] = useState(getInitialState(fieldKeys));
  console.log("validationErrors 1");
  console.log(validationErrors);

  const save = async (username) => {
    return await userApi.update({"username":username});
  };

  const handleResult = async (result) => {
    setSaveAttempted(true);
    if (result) {
      console.log(result.data);
      if (result.ok && result.data) {
        setSaveFailed(false);
        auth.updateUser(result.data);
      } else if (result.data) {
        
        console.log("result was not okay");
        setSaveFailed(true);
        
        if ("non_field_errors" in result.data) {
          console.log("non_field_errors in result.data");
          throw new Error(result.data.non_field_errors[0]);
        } else {
          console.log("else");
          const errorKeys = Object.keys(result.data);
          errorKeys.forEach((key) => {
            const error = result.data[key];
            console.log("error");
            console.log(error);
            validationErrors[key] = error
            setValidationErrors(validationErrors);
            //setValidationErrors does nothing
            // throw new errir displaye the error but doesn't shake
            //throw new Error(error);

          
          
          });
          console.log("validationErrors");
          console.log(validationErrors);
        }

      
      
      
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
            fieldErrors = {validationErrors}
            fields={{
              username: {
                label: 'Username',
                inputProps: {
                  keyboardType: 'name-phone-pad',
                  autoCapitalize: 'none',
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