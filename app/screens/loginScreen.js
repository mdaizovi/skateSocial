import React, {Component, useState} from 'react';
import { View, StyleSheet, FlatList, Text, TextInput, Button, Image, TouchableOpacity,} from 'react-native';
import appUserContext from '../context/appUserContext';
import { StatusBar } from "expo-status-bar";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/icon.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-adress"
          onChangeText={(email) => setEmail(email)}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          style={styles.TextInput}
          textContentType="emailAddress" // only works on ios
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          onChangeText={(password) => setPassword(password)}
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


      <TouchableOpacity style={styles.loginBtn}
        onPress={()=> console.log(email, " ",password)}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.link_button}>Register</Text>
      </TouchableOpacity>
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
 
  link_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: "#FF1493",
  },
});