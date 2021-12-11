import React from 'react';
import { View, StyleSheet, FlatList, Text, TextInput, Button, Image, TouchableOpacity,} from 'react-native';
import {useFormikContext} from 'formik'

export default function AppSubmitButton({title}) {
    const {handleSubmit} = useFormikContext(); 
    return (
        <TouchableOpacity style={styles.submitBtn}
        onPress={handleSubmit}
      >
        <Text style={styles.loginText}>{title}</Text>
      </TouchableOpacity>
    );
  }

 
const styles = StyleSheet.create({
    submitBtn: {
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