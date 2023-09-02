import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { useFonts } from "expo-font";
import { LoginScreen } from "./Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { Home } from "./Screens/Home";
import { CommentsScreen } from "./Screens/CommentsScreen";
import { MapScreen } from "./Screens/MapScreen";
import { Pressable } from "react-native";
import { ButtonGoBack } from "./components/Button";

const MainStack = createStackNavigator();

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
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="RegistrationScreen">
        <MainStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />

        <MainStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <MainStack.Screen
          name="CommentsScreen"
          component={CommentsScreen}
          options={{
            // headerShown: false,
            title: "Коментарі",
            headerLeft: () => (
              <ButtonGoBack />
            ),
            headerTitleStyle: {
              fontFamily: "Roboto500",
              color: "#212121",
            },
            headerStyle: {
              boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
              borderBottomWidth: 1,
              borderBottomColor: "#E8E8E8",
            },
          }}
        />

        <MainStack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            // headerShown: false
            title: "Коментарі",
            headerLeft: () => <ButtonGoBack />,
            headerTitleStyle: {
              fontFamily: "Roboto500",
              color: "#212121",
            },
            headerStyle: {
              boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
              borderBottomWidth: 1,
              borderBottomColor: "#E8E8E8",
            },
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
