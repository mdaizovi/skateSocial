import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList} from "react-native";
import SearchFriendCard from "../../components/SearchFriendCard";


export default function SearchPeopleTab(props) {

  return (

  <FlatList
    data={props.searchResults.users}
    keyExtractor={(item) => "" + item.id}
    renderItem={({ item }) => (
      <SearchFriendCard
        title={item.name}
        subTitle={item.username}

        //imageUrl={item.images[0].url}
        //onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
        //thumbnailUrl={item.images[0].thumbnailUrl}
      />

    )}

    />




  );
}

