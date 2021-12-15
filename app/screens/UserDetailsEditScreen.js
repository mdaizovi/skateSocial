import React, { useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import useAuth from "../auth/useAuth";
import { ListItem, ListItemSeparator } from "../components/lists";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Icon from "../components/Icon";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),

  old_password: Yup.string().required().min(8).label("Old Password"),
  new_password1: Yup.string().required().min(8).label("New Password"),
  new_password2: Yup.string().required().min(8).label("New Password (again)"),

  first_name: Yup.string().required().min(8).label("First Name"),
  username: Yup.string().required().min(8).label("Username"),

});


export default function UserDetailsEditScreen(props) {
  const { user, logOut } = useAuth();

  const resendConfirmationEmail = async () => {
    console.log("resendConfirmationEmail ");
    
  };

  const handleSubmit = async (userInfo) => {
    console.log("handleSubmit: save");
    
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>

      <View style={styles.container}>
        <ListItem>
          <Text>email</Text>
        </ListItem>
        <ListItem
          title="Resend Email Confirmation"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => resendConfirmationEmail()}
        />
      </View>



      <View style={styles.container}>
        <ListItem
          title="Resend Email Confirmation"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => resendConfirmationEmail()}
        />
      </View>

      <View style={styles.container}>
        <ListItem
          title="Save"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => handleSubmit()}
        />
      </View>

      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

