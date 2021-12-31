import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Formik} from 'formik'
// I really like these xtras like fade and shake, but i can't figure out ow to get it to work with this 
// inherited form structure that i have
// https://scottdomes.com/react-native-sexy-forms/


export default function AppForm({initialValues, onSubmit, validationSchema, children}) {
  
    return (
        <View style={styles.container}>
            <Formik
                initialValues = {initialValues}
                onSubmit={ onSubmit }
                validationSchema = {validationSchema}
            >
                { () => (
                    <>
                        {children}
                    </>
                )}
            </Formik>
        </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
      width: "100%",
    },
    error: {
      marginBottom: 20,
      height: 17.5,
    },
  }); 