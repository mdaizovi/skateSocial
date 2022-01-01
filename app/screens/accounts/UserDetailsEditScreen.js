import React, { useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import useAuth from "../../auth/useAuth";
import emailConfirmApi from "../../api/resendEmailConfirmation";

import { ListItem,ListItemChevron, ListItemSeparator } from "../../components/lists";
import Screen from "../../components/Screen";
import routes from "../../navigation/routes";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),

  old_password: Yup.string().required().min(8).label("Old Password"),
  new_password1: Yup.string().required().min(8).label("New Password"),
  new_password2: Yup.string().required().min(8).label("New Password (again)"),

  first_name: Yup.string().required().min(8).label("First Name"),
  username: Yup.string().required().min(8).label("Username"),

});


export default function UserDetailsEditScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const [emailConfirmationSent, setemailConfirmationSent] = useState(false);
  const [EmailConfirmaFailed, setemailConfirmaFailed] = useState(false);

  const resendConfirmationEmail = async () => {
    const result = await emailConfirmApi.resendEmailConfirmation(user.email);
    if (!result.ok) {
      setemailConfirmaFailed(true);
      } else {
        setemailConfirmationSent(true);
      }
  };

  const handleSubmit = async (userInfo) => {
    console.log("handleSubmit: save");
    
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>

        <ListItemChevron
          title={user.name}
          onPress={() => navigation.navigate(routes.EDIT_NAME)}
        />
        <ListItemChevron
          title={user.username}
          onPress={() => navigation.navigate(routes.EDIT_USERNAME)}
        />


      <View style={styles.container}>
      <ListItemChevron
          title={user.email}
          onPress={() => navigation.navigate(routes.CHANGE_EMAIL)}
        />

        {!user.email_verified ? (
          <>
            {emailConfirmationSent ? (
            <ListItem
            title="Email Confirmation Sent"
            IconComponent={<Icon name="email-send" backgroundColor={colors.mint} />}
            />
          ) : (
            <ListItem
            title="Resend Email Confirmation"
            IconComponent={<Icon name="email-send" backgroundColor="#ffe66d" />}
            onPress={() => resendConfirmationEmail()}
            />
          )}
			    </>
        ) : (
				  <>
			    </>
			  )}


      <ListItemChevron
          title="Change Password"
          onPress={() => navigation.navigate(routes.CHANGE_PASSWORD)}
        />        
      </View>

      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
  },
  container: {
    marginVertical: 20,
  },
  listItemText: {
    color: "black"
  },  
});

