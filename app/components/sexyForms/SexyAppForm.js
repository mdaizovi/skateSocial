import React, { useState, useRef } from 'react';
import { Animated,  SafeAreaView, Text, TextInput, View, Button, StyleSheet} from 'react-native';
import {hasValidationError, validateFields } from './SexyAppFormValidation';
import SexyAppFormField from './SexyAppFormField';
import SexyAppSubmitButton from './SexyAppSubmitButton';

const getInitialState = (fieldKeys) => {
  const state = {};
  fieldKeys.forEach((key) => {
    state[key] = '';
  });

  return state;
};


const SexyAppForm = ({  fields, buttonText, action, afterSubmit }) => {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldKeys));
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState(
    getInitialState(fieldKeys),
  );

  const [opacity] = useState(new Animated.Value(1));
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };
    setValues(newState);
  
    if (validationErrors[key]) {
      const newErrors = { ...validationErrors, [key]: '' };
      setValidationErrors(newErrors);
    }
  };

  const getValues = () => {
    return fieldKeys.sort().map((key) => values[key]);
  };


  const fadeOut = () => {
    Animated.timing(fadeAnim, 
      {toValue: 0.2, duration: 200, useNativeDriver: true}
      ).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, 
      {toValue: 1, duration: 200, useNativeDriver: true}
      ).start();
    };

    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

  const submit = async () => {
    setErrorMessage('');
    setValidationErrors(getInitialState(fieldKeys));
  
    const errors = validateFields(fields, values);
    if (hasValidationError(errors)) {
      return setValidationErrors(errors);
    }
    fadeOut();
    try {
      const result = await action(...getValues());
      await afterSubmit(result);
    } catch (e) {
      await delay(1000);
      setErrorMessage(e.message);
      fadeIn();
    }
  };

return (
  <View style={styles.container}>
    <Text style={styles.error}>{errorMessage}</Text>
    <Animated.View
      style={[
        styles.fadingContainer,
        {
          // Bind opacity to animated value
          opacity: fadeAnim
        }
      ]}
    >
              {fieldKeys.map((key) => {
          return (
            <SexyAppFormField
              key={key}
              fieldName={key}
              field={fields[key]}
              error={validationErrors[key]}
              onChangeText={onChangeValue}
              value={values[key]}
            />
          );
        })}
    </Animated.View>
    <SexyAppSubmitButton title={buttonText} onPress={submit} />
    {/* <View style={styles.buttonRow}>
      <Button title="Fade In View" onPress={fadeIn} />
      <Button title="Fade Out View" onPress={fadeOut} />
    </View> */}
  </View>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
    error: {
    marginBottom: 20,
    height: 17.5,
    color:"red",
  },
  fadingContainer: {
    padding: 20,
    //backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16
  }
});

export default SexyAppForm;