import React from "react";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { Home } from "./Screens/Home";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto400: require("./assets/fonts/Roboto-Regular.ttf"),
    Roboto500: require("./assets/fonts/Roboto-Medium.ttf"),
    Roboto700: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
