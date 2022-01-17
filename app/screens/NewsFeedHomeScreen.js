import React, { useEffect } from "react";
import { FlatList, Text, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import EventCard from "../components/EventCard";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import TopBar from '../components/bars/TopBarNews';

// NewsFeedHomeScreen

import NewsFeedHomeURL from "../api/newsfeedHome";
import useApi from "../hooks/useApi";


const events = [
  {
    id: 1,
    user: "Pinkmel",
    text: "Bring a speaker!",
    start_at: "Monday 16:30",
    end_at: "Monday 18:30",
    spot:"G3"
  },
  {
    id: 2,
    user: "Booty",
    text: null,
    start_at: "Monday 16:30",
    end_at: "Monday 18:30",
    spot:"Fenny"
  },
];

export default function NewsFeedHomeScreen({ navigation }) {
  // const getListingsApi = useApi(listingsApi.getListings);

  // useEffect(() => {
  //   getListingsApi.request();
  // }, []);

  return (
    <>
    {/* <ActivityIndicator visible={getListingsApi.loading} /> */}
    
    <Screen style={styles.screen}>
      <TopBar></TopBar>
      <Text>Upcoming</Text>
        {/* {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={getListingsApi.request} />
          </>
        )} */}
      
      <FlatList
        data={events}
        keyExtractor={(event) => event.id.toString()}
        renderItem={({ item }) => (
          <EventCard
            title={item.user + " at " + item.spot + ": " + item.start_at + " - " + item.end_at}
            subTitle={item.text || null}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
      <Text>Past</Text>

    </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});







