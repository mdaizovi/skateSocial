import React, { useState } from "react";
import { Text, View,  StyleSheet} from "react-native";
import MapView from 'react-native-maps';
import * as Location from "expo-location";

import useLocation from "../../hooks/useLocation";

export default function SearchPlacesTab(props) {

  const checkPermission = async () => {
    //console.log("checkPermission");
    const hasPermission =  await Location.requestForegroundPermissionsAsync();
    //console.log("hasPermission: "+hasPermission);
    if (!hasPermission.status === 'granted') {
      const permission = await askPermission();
      //console.log("permission: "+permission);
    }
    //console.log("hasPermission.status: "+hasPermission.status);
    return true;
  };
  
  const askPermission = async () => {
    //console.log("askPermission");
    const permission = await Location.requestForegroundPermissionsAsync();
    //console.log(permission.status);
    return permission.status === 'granted';
  };

  const getMapRegion = (location) => {
    const [mapRegion, setmapRegion] = useState({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }); 
    return mapRegion;
  };

  const hasLocationPermission = checkPermission();
  //const [location, setLocation] = useState(useLocation());
  const location = useLocation();
  console.log("location in search places tab");
  console.log(location);

  return (  
    <View>
      <Text>Test</Text>

      {(() => {
        if (hasLocationPermission){
              return (
                <View>
                  
                  {!location ? (
                    <Text>fetching location...</Text>
                  ) : (
  
                    <MapView
                    style={{ alignSelf: 'stretch', height: '100%' }}
                    region={
                      

{
                      latitude: location.latitude,
                      longitude: location.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421}


                    }
                  />
                  )}


              </View>
                )
        }
        return <Text>Please enable location permissions so we can show you skate spots near you</Text>
      })()}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});