import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import AppErrorMessageText from './AppErrorMessageText';
import {useFormikContext} from 'formik'

export default function AppFormField({name,width,label, ...otherProps}) {
    const {setFieldTouched,
      setFieldValue,
      errors,
      touched,
      values,} = useFormikContext(); 
 
      return (
        <>
        <View style={styles.inputContainer}>
          <Text>{label}</Text>
            <TextInput
              style={styles.input}
              onBlur={() => setFieldTouched(name)}
              onChangeText={(text) => setFieldValue(name, text)}
              value={values[name]}
              width={width}
              {...otherProps}
            />
            <AppErrorMessageText style={styles.error} error={errors[name]} visible={touched[name]} />
          </View>
        </>
      );
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
        width: 300,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      error: { textAlign: 'center', height: 17.5 },
    });   