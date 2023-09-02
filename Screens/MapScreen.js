import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import { PROVIDER_GOOGLE } from "react-native-maps";

export const MapScreen = () => {
  const [location, setLocation] = useState(null);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({});
    // enableHighAccurancy: true,
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.containerMap}>
      <MapView
        style={styles.map}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        // minZoomLevel={15}
        // showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
      >
        {location && (
          <Marker coordinate={location} title="I am here" description="Hello" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
