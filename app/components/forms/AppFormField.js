import React from 'react';
import {TextInput} from 'react-native';
import AppErrorMessageText from './AppErrorMessageText';
import {useFormikContext} from 'formik'

export default function AppFormField({name, ...otherProps}) {
    const {setFieldTouched, handleChange, errors, touched} = useFormikContext(); 
 
    return (
        <>
          <TextInput
            onBlur={() => setFieldTouched(name)}
            onChangeText={handleChange(name)}
            {...otherProps}
          />
          <AppErrorMessageText error={errors[name]} visible={touched[name]}/>
      </>
    );
  }