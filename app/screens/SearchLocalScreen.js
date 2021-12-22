import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList} from "react-native";

import * as Location from 'expo-location';
import { SearchBar, Tab, TabView, Button, ButtonGroup } from 'react-native-elements';

import Screen from "../components/Screen";
import colors from "../config/colors";
import searchApi from "../api/search";
import SearchPeopleTab from './search/searchPeopleTab';
import SearchPlacesTab from './search/searchPlacesTab';

export default function SearchLocalScreen() {
  const [searchQuery, setsearchQuery] = useState('');
  const [searchResults, setsearchResults] = useState({'users':null, 'places':null});
  const [index, setindex] = useState(0);
  const [searchFailed, setsearchFailed] = useState(false);

  const updateSearch = async (searchQuery) => {
    // this changes with every keystroke
    setsearchQuery(searchQuery);
  };

  const updateIndex = (index) => {
    console.log("updateIndex: "+index)
    setindex(index);
  };

  const handleSubmit = async () => {
    console.log("handleSubmit");
    console.log("searchQuery "+ searchQuery);

    const result = await searchApi.getSearchResults(searchQuery);
    if (!result.ok) {
      setsearchFailed(true);
      } else {
        console.log(result.data);
        setsearchResults(result.data);
      }
  };

    return (
      <Screen style={styles.screen}>
        <View style={styles.container}>
          <SearchBar
            placeholder="Search for people or places..."
            onChangeText={updateSearch}
            value={searchQuery}
            onSubmitEditing={handleSubmit}
          />


        <Tab value={index} onChange={updateIndex}>
          <Tab.Item title="people" />
          <Tab.Item title="places" />
        </Tab>

        {/* {this.state.index == 0? <Text>zero</Text>: <Text>1</Text> } */}

        {/* Hard to read but it works */}
        {(() => {
              if (index == 0){
                  if(!searchResults.users){
                    return (
                      <Text>Search for skaters in your area</Text>
                      )
                                    
                }else{
                  return (
                    <SearchPeopleTab searchResults = {searchResults}/>
                    )
                }
              } else if (index == 1){
                return (
                  <SearchPlacesTab/>
                )
              }
              return null;
            })()}


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
