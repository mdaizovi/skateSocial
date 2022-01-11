import React, { useState, useRef } from 'react';
import { ActivityIndicator, Animated,  KeyboardAvoidingView, Text, TextInput, View, Button, StyleSheet} from 'react-native';
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

const animationTimeout = () =>
  new Promise((resolve) => setTimeout(resolve, 700));
  
const SexyAppForm = ({ fields, buttonText, action, afterSubmit, validationSchema }) => {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldKeys));
  const [errorMessage, setErrorMessage] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isSubmitting, setSubmitting] = useState(false);

  const [validationErrors, setValidationErrors] = useState(
    getInitialState(fieldKeys),
  );

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
    setSubmitting(true);
    setErrorMessage('');
    setValidationErrors(getInitialState(fieldKeys));
    const errors = validateFields(fields, values, validationSchema);
    if (hasValidationError(errors)) {
      await animationTimeout();
      setSubmitting(false);
      fadeIn();
      return setValidationErrors(errors);
    }
    fadeOut();
    try {
      const [result] = await Promise.all([
        action(...getValues()),
        animationTimeout(),
      ]);
      await afterSubmit(result);
    } catch (e) {
      setErrorMessage(e.message);
    }
    fadeIn();
    // TODO: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    setSubmitting(false);
  };

return (
  <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    <Text style={styles.nonFieldError}>{errorMessage}</Text>
    <Animated.View
      style={[
        styles.fadingContainer,
        {
          // Bind opacity to animated value
          opacity: fadeAnim
        }
      ]}
    >
      {isSubmitting && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#3F5EFB" />
        </View>
      )}

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
    <SexyAppSubmitButton title={buttonText} onPress={submit} isSubmitting={isSubmitting} />
  </KeyboardAvoidingView>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    position: 'relative',
  },
  activityIndicatorContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },  
    nonFieldError: {
    marginBottom: 20,
    height: 17.5,
    color: "red"
  },
  fadingContainer: {
    padding: 20,
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