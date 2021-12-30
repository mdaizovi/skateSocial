import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Formik} from 'formik'

export default function AppForm({initialValues, onSubmit, validationSchema, children}) {
    return (
        <View style={styles.container}>
            <Formik
                initialValues = {initialValues}
                onSubmit={ onSubmit}
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