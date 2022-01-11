import React, { useState } from 'react';
import {Animated, Text, TextInput, View, StyleSheet } from 'react-native';


export default class SexyAppFormField extends React.Component {
  position = new Animated.Value(0);

  shiftPosition(distance) {
    const duration = 50;
    return Animated.timing(this.position, {
      toValue: distance,
      duration,
      useNativeDriver: true,
    });
  }

  startShake = () => {
    const distance = 10;

    Animated.sequence([
      this.shiftPosition(distance),
      this.shiftPosition(-distance),
      this.shiftPosition(distance),
      this.shiftPosition(-distance),
      this.shiftPosition(distance),
      this.shiftPosition(0),
    ]).start();
  };

  shake() {
    setTimeout(this.startShake, 100);
  };
  
  componentDidUpdate(prevProps) {
    if (
      // prevProps.isSubmitting &&
      // !this.props.isSubmitting &&
      this.props.error
    ) {
      //TODO: only shake if changed.
      this.shake();
    }
  };

  render() {
    const { fieldName, field, value, onChangeText, error } = this.props;
    return (
      <Animated.View
      style={{ transform: [{translateX: this.position}], ...styles.inputContainer }}
      >
        <Text>{field.label}</Text>
        <TextInput
          style={styles.input}
          {...field.inputProps}
          value={value}
          onChangeText={(text) => onChangeText(fieldName, text)}
        />
        <Text style={styles.fieldError}>{error}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  fieldError: { textAlign: 'center', height: 17.5, color: "red" },
});