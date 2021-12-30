// import React from 'react';
// import {StyleSheet, Text, TouchableOpacity,} from 'react-native';
// import {useFormikContext} from 'formik'

// export default function AppSubmitButton({title}) {
//     const {handleSubmit} = useFormikContext(); 
//     return (
//         <TouchableOpacity style={styles.submitBtn}
//         onPress={handleSubmit}
//       >
//         <Text style={styles.loginText}>{title}</Text>
//       </TouchableOpacity>
//     );
//   }

 
// const styles = StyleSheet.create({
//     submitBtn: {
//         width: "80%",
//         borderRadius: 25,
//         height: 50,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 10,
//         marginBottom: 30,
//         backgroundColor: "#FF1493",
//       },
//   }); 
import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../Button";

function SubmitButton({ title, color }) {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title} color={color} onPress={handleSubmit} />;
}

export default SubmitButton;