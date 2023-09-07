import { createStackNavigator } from "@react-navigation/stack";
import { CommentsScreen } from "./CommentsScreen";
import { ButtonGoBack } from "../components/Button";
import { MapScreen } from "./MapScreen";
import { InitialPostsScreen } from "./InitialPostsScreen";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {

  return (
    <NestedScreen.Navigator initialRouteName="PostsScreen">
      <NestedScreen.Screen
        name="InitialPostsScreen"
        component={InitialPostsScreen}
        options={{ headerShown: false }}
      />

      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          // headerShown: false,
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

      <NestedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          // headerShown: false
          title: "Карта",
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
    </NestedScreen.Navigator>
  );
};

