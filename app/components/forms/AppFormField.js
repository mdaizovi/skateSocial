import React from 'react';
import {TextInput} from 'react-native';
import AppErrorMessageText from './AppErrorMessageText';
import {useFormikContext} from 'formik'

export default function AppFormField({name,width, ...otherProps}) {
    const {setFieldTouched,
      setFieldValue,
      errors,
      touched,
      values,} = useFormikContext(); 
 
      return (
        <>
          <TextInput
            onBlur={() => setFieldTouched(name)}
            onChangeText={(text) => setFieldValue(name, text)}
            value={values[name]}
            width={width}
            {...otherProps}
          />
          <AppErrorMessageText error={errors[name]} visible={touched[name]} />
        </>
      );
    }