import React from "react";
import { StyleSheet , Text} from "react-native";

import Screen from "../components/Screen";

function ListingEditScreen() {
  //const location = useLocation(); //look this up later!

  return (
    <Screen style={styles.container}>
      <Text> Empty screen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
