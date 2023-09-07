import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet, View } from "react-native";
import { PROVIDER_GOOGLE } from "react-native-maps";

export const MapScreen = ({ route }) => {
  const title = route.params.title;
  const location = route.params.location;
  const { latitude, longitude } = route.params.coords;


  return (
    <View style={styles.containerMap}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        mapType="standard"
        minZoomLevel={15}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={title}
          description={location}
        />
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
