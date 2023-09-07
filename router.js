import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { PostsScreen } from "./Screens/PostsScreen";
import { CreatePostsScreen } from "./Screens/CreatePostsScreen";
import { ProfileScreen } from "./Screens/ProfileScreen";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { ButtonGoBack } from "./components/Button";

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="RegistrationScreen">
        <AuthStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 9,
          paddingHorizontal: 90,
        },
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="grid" size={24} color="#212121CC" />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.plusBnt}>
                <Feather name="plus" size={24} color="#FFFFFF" />
              </View>
            );
          },
          title: "Створити публікацію",
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
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather name="user" size={24} color="#212121CC" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  plusBnt: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#FF6C00",
  },
});
