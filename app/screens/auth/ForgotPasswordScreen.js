import React, { useState } from "react";
import { StyleSheet,TouchableOpacity, Text, SafeAreaView, View } from "react-native";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import authApi from "../../api/auth";
import {
  SexyAppForm
} from "../../components/sexyForms";
import routes from "../../navigation/routes";


const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

export default function ForgotPasswordScreen(props) {
  const [requestFailed, setRequestFailed] = useState(false);

  const requestResetEmail = async (email) => {
    return await authApi.sendResetPasswordEmail(email);
  };

  const handleResult = async (result) => {
    if (result) {

      if (result.ok && result.data) {
        setRequestFailed(false);
      } else if (result.data) {
        setRequestFailed(true);
        // TODO forog thow to check if .non_field_errors exists.
        throw new Error(result.data.non_field_errors[0]);
      } else {
        setRequestFailed(true);
        throw new Error("Something went wrong");
      }
      
    } else {
      setRequestFailed(true);
      throw new Error("Something went wrong");
    }

  };

  return (
    <Screen style={styles.container} >

    <Text style={styles.explanationText}>Please enter your email address so we can
    send you an email to reset your password.
    </Text>

    <SexyAppForm
    action={requestResetEmail}
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
    }}
  />

      <TouchableOpacity onPress={() => props.navigation.navigate(routes.REGISTER)}>
        <Text style={styles.alternativeOptionText}>Create New Account</Text>
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
  },  
  explanationText: {
    alignSelf: "center",
    top:"20%",
    width:"60%",
  }
});
