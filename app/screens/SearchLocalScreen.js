import React from "react";
import { StyleSheet, View, Text} from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";

function SearchLocalScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <Text>Search for skaters and skate spots here</Text>
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
export default SearchLocalScreen;
