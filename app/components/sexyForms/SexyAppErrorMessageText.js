import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function AppErrorMessageText({error, visible}) {
    if (!visible || !error) return null;
   
    return (
      <Text style={styles.errorText}>
          {error}
        </Text>
    )
}


const styles = StyleSheet.create({
    errorText: {
        color: "red"
    },
})    