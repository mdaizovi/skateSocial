import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { validateContent, validateLength } from '../../components/sexyForms/SexyAppFormValidation';


import {
  SexyAppForm
} from "../../components/sexyForms";


export default function EditUsernameScreen(props) {
  const [refreshing, setRefreshing] = useState(false);

  const login = () => {
    console.log("do nothing");
  };

  const handleResult = async (result) => {
    if (result.ok && result.data) {
      console.log("it's all good");
    } else if (result.status === 401) {
      throw new Error('Invalid.');
    } else {
      throw new Error('Something went wrong.');
    }
  };

  return (
    <SexyAppForm

    action={login}
    afterSubmit={handleResult}
    buttonText="Submit"
    fields={{
      email: {
        label: 'Email',
        validators: [validateContent],
        inputProps: {
          keyboardType: 'email-address',
        },
      },
      password: {
        label: 'Password',
        validators: [validateContent, validateLength],
        inputProps: {
          secureTextEntry: true,
        },
      },
    }}
  
  />
  );
}

const styles = StyleSheet.create({});
