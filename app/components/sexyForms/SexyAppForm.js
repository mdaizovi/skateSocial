import React, { useState, useRef } from 'react';
import { ActivityIndicator, Animated,  KeyboardAvoidingView, Text, View, StyleSheet} from 'react-native';
import {hasValidationError, validateFields, getInitialState  } from './SexyAppFormValidation';
import SexyAppFormField from './SexyAppFormField';
import SexyAppSubmitButton from './SexyAppSubmitButton';

const animationTimeout = () =>
  new Promise((resolve) => setTimeout(resolve, 700));

  const getInitialValues = (fields) => {
    const initialValues = {};
    for (const [key, field] of Object.entries(fields)) {
      if ("value" in field) {
        initialValues[key] = field["value"];
      } else {
        initialValues[key] = "";
      };
    };
    return initialValues;
  };

const SexyAppForm = ({ fields, buttonText, action, afterSubmit=null, validationSchema }) => {
  const fieldKeys = Object.keys(fields);
  // const [values, setValues] = useState(getInitialState(fieldKeys));
  const [errorMessage, setErrorMessage] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isSubmitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState(getInitialState(fieldKeys));
  const [actionAttempted, setActionAttempted] = useState(false);
  const [actionFailed, setActionFailed] = useState(false);
  const [values, setValues] = useState(getInitialValues(fields));

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

    // function delay(time) {
    //   return new Promise(resolve => setTimeout(resolve, time));
    // }

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
      setActionAttempted(true);
      if (result) {
        if (result.ok && result.data) {
          setActionFailed(false);
        } else if (result.data) {
          setActionFailed(true);
          if ("non_field_errors" in result.data) {
            throw new Error(result.data.non_field_errors[0]);
          } else {
            const errorKeys = Object.keys(result.data);
            errorKeys.forEach((key) => {
              const error = result.data[key];
              const newErrors = { ...validationErrors, [key]: error };
              setValidationErrors(newErrors);
            });
          }
        } else {
          setActionFailed(true);
          throw new Error("Something went wrong");
        }
      } else {
        setActionFailed(true);
        throw new Error("Something went wrong");
      }

      if (afterSubmit) {
        await afterSubmit(result);
      }
      setSubmitting(false);
      fadeIn();
      return result;
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

    {actionAttempted && !actionFailed ? (
				<Text>Saved!!!</Text>
			) : (
			<>

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
              })
            }

        </Animated.View>
        <SexyAppSubmitButton title={buttonText} onPress={submit} isSubmitting={isSubmitting} />
			</>
		)}
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