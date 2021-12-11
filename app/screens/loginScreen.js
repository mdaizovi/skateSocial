import React, {Component, useState} from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,} from 'react-native';
import {AppForm, AppFormField, AppSubmitButton } from '../components/forms/';
import { StatusBar } from "expo-status-bar";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
}
)

export default function LoginScreen() {
 
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/icon.png")} />
 
      <StatusBar style="auto" />

    <AppForm
      initialValues = {{email:'', password:''}}
      onSubmit={values => console.log(values)}
      validationSchema = {validationSchema}
      >
      <View style={styles.inputView}>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          placeholderTextColor="#003f5c"
          style={styles.TextInput}
          textContentType="emailAddress" // only works on ios
        />
      </View>
 
      <View style={styles.inputView}>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          style={styles.TextInput}
          textContentType="password" // only works on ios
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.link_button}>Forgot Password?</Text>
      </TouchableOpacity>


      <AppSubmitButton
      title="LOGIN"
      />
      <TouchableOpacity>
        <Text style={styles.linkButton}>Register</Text>
      </TouchableOpacity>

          </AppForm>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  linkButton: {
    height: 30,
    marginBottom: 30,
  },
});