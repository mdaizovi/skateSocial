import React from "react";
import { StyleSheet, View, Text} from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import { SearchBar, Tab, TabView, Button, ButtonGroup } from 'react-native-elements';


export default class SearchLocalScreen extends React.Component {
  state = {
    search: '',
    index :0,
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  updateIndex = (index) => {
    console.log("updateIndex: "+index)
    this.setState({ index });
  };

  render() {

    const { search, index } = this.state;

    return (
      <Screen style={styles.screen}>
        <View style={styles.container}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
          />


        <Tab value={index} onChange={this.updateIndex}>
          <Tab.Item title="people" />
          <Tab.Item title="places" />
        </Tab>

        {/* {this.state.index == 0? <Text>zero</Text>: <Text>1</Text> } */}

        {/* Hard to read but it works */}
        {(() => {
              if (this.state.index == 0){
                  return (
                      <Text>People search results</Text>
                  )
              } else if (this.state.index == 1){
                return (
                  <Text>Location search coming soon</Text>
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
