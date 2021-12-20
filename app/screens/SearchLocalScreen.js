import React from "react";
import { StyleSheet, View, Text, FlatList} from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import { SearchBar, Tab, TabView, Button, ButtonGroup } from 'react-native-elements';

import searchApi from "../api/search";
import SearchPeopleTab from './search/searchPeopleTab';
import SearchPlacesTab from './search/searchPlacesTab';

export default class SearchLocalScreen extends React.Component {
  state = {
    searchQuery: '',
    searchResults:{'users':null, 'places':null},
    index :0,
    searchFailed: false,
  };

  updateSearch = async (searchQuery) => {
    // this changes with every keystroke
    this.setState({ searchQuery});
  };

  updateIndex = (index) => {
    console.log("updateIndex: "+index)
    this.setState({ index });
  };

  handleSubmit = async () => {
    console.log("handleSubmit");
    const searchQuery = this.state.searchQuery;
    console.log("searchQuery "+searchQuery);

    const result = await searchApi.getSearchResults(searchQuery);
    if (!result.ok) {
      this.setState({ searchFailed:true});
      } else {
        console.log(result.data);
        this.setState({ searchResults:result.data, searched:true});
      }
  };

  render() {

    const { searchQuery, index } = this.state;

    return (
      <Screen style={styles.screen}>
        <View style={styles.container}>
          <SearchBar
            placeholder="Search for people or places..."
            onChangeText={this.updateSearch}
            value={searchQuery}
            onSubmitEditing={this.handleSubmit}
          />


        <Tab value={index} onChange={this.updateIndex}>
          <Tab.Item title="people" />
          <Tab.Item title="places" />
        </Tab>

        {/* {this.state.index == 0? <Text>zero</Text>: <Text>1</Text> } */}

        {/* Hard to read but it works */}
        {(() => {
              if (this.state.index == 0){


                  if(!this.state.searchResults.users){
                    return (
                      <Text>Search for skaters in your area</Text>
                      )
                                    
                }else{
                  return (
                    <SearchPeopleTab searchResults = {this.state.searchResults}/>
                    )
                }

              } else if (this.state.index == 1){
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
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});
