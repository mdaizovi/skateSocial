import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default useLocation = () => {
  console.log("useLocation");
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      // Do i want foreground or background location?
      //const { granted } = await Location.requestBackgroundPermissionsAsync();
      //const { granted } = await Location.requestForegroundPermissionsAsync();
      const { granted } = await Location.requestPermissionsAsync(); // deprecated, replace soon
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();// faster than Location.getCurrentPositionAsync
      setLocation({ latitude, longitude });
      console.log(latitude, longitude);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};
