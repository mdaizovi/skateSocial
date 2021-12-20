import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList} from "react-native";



export default function SearchPeopleTab(props) {

  return (
    <FlatList
    data={props.searchResults.users}
    renderItem={({ item }) => (
        <View>
            <Text>{item.name}</Text>
        </View>
    )}
    keyExtractor={(item) => "" + item.pk}
/>
  );
}

