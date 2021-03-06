import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ListItem, ListItemChevron, ListItemSeparator } from "../../components/lists";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";

const menuItems = [
  {
    title: "My Events/Posts",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  // {
  //   title: "My Tricks",
  //   icon: {
  //     name: "format-list-bulleted",
  //     backgroundColor: colors.primary,
  //   },
  // },
  // {
  //   title: "My Videos",
  //   icon: {
  //     name: "format-list-bulleted",
  //     backgroundColor: colors.primary,
  //   },
  // },
  // {
  //   title: "My Spots (bookmarked? added?)",
  //   icon: {
  //     name: "format-list-bulleted",
  //     backgroundColor: colors.primary,
  //   },
  // },
  // {
  //   title: "My Messages",
  //   icon: {
  //     name: "email",
  //     backgroundColor: colors.secondary,
  //   },
  //   targetScreen: routes.MESSAGES,
  // },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItemChevron
          title={user.first_name}
          subTitle={user.email}
          image={require("../../assets/mosh.jpg")}
          onPress={() => navigation.navigate(routes.USER_DETAILS_EDIT)}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItemChevron
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
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
});

export default AccountScreen;
