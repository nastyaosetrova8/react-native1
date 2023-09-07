import { createStackNavigator } from "@react-navigation/stack";
import { CommentsScreen } from "./CommentsScreen";
import { ButtonGoBack } from "../components/Button";
import { MapScreen } from "./MapScreen";
import { InitialPostsScreen } from "./InitialPostsScreen";
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { authSingOutUser } from "../redux/operations";
import { useDispatch } from "react-redux";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  const dispatch = useDispatch();

  return (
    <NestedScreen.Navigator initialRouteName="PostsScreen">
      <NestedScreen.Screen
        name="InitialPostsScreen"
        component={InitialPostsScreen}
        options={{
          headerTitle: "Публікації",
          headerLeft: false,
          headerRight: () => (
            <Pressable
              style={{ marginRight: 16 }}
              onPress={() => dispatch(authSingOutUser())}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </Pressable>
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

      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
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
