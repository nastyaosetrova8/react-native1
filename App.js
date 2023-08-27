import { StatusBar } from "expo-status-bar";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { useFonts } from "expo-font";
import { LoginScreen } from "./Screens/LoginScreen";

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
    <>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
      <StatusBar style="auto" />
    </>
  );
}











// <View style={styles.container}>
//   <ImageBackground source={bgImg} style={styles.image}>
//     <RegistrationScreen />
//     {/* <LoginScreen /> */}
//   </ImageBackground>

//   <StatusBar style="auto" />
// </View>

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },

//   image: {
//     flex: 1,
//     width: "100%",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     resizeMode: "cover",
//   },
// });
