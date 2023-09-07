// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { RegistrationScreen } from './Screens/Auth/RegistrationScreen';
// import { LoginScreen } from './Screens/Auth/LoginScreen';
// import { PostsScreen } from './Screens/Main/PostsScreen';
// import { CreatePostScreen } from './Screens/Main/CreatePostsScreen';
// import { ProfileScreen } from './Screens/Main/ProfileScreen';

// import { SimpleLineIcons } from '@expo/vector-icons';
// import { Feather } from '@expo/vector-icons';

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
// import { useNavigation } from "@react-navigation/native";
import { PostsScreen } from "./Screens/PostsScreen";
import { CreatePostsScreen } from "./Screens/CreatePostsScreen";
import { ProfileScreen } from "./Screens/ProfileScreen";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { authSingOutUser } from "./redux/operations";
import { ButtonGoBack } from "./components/Button";
import { useDispatch } from "react-redux";



const AuthStack = createStackNavigator();
// const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  // const handleSignOut = () => {
  //   navigation.navigate("RegistrationScreen");
  // };
  // const handleToPosts = () => {
  //   navigation.navigate("PostsScreen");
  // };


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
          // boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
          //   borderTopWidth: 1,
          //   borderTopColor: "#B3B3B3",
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
          title: "Публікації",
          headerLeft: false,
          headerRight: () => (
            <Pressable style={{ marginRight: 16 }} onPress={() => dispatch(authSingOutUser())}>
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
          headerLeft: () => <ButtonGoBack />
            // <Pressable style={{ marginLeft: 16 }} onPress={handleToPosts}>
            //   <AntDesign name="arrowleft" size={24} color="#212121CC" />
            // </Pressable>
          ,
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
  }
  })


//================================================

// import React, { useState, useEffect } from 'react';
// import { RegistrationScreen } from "./Screens/RegistrationScreen";
// import { useFonts } from "expo-font";
// import { LoginScreen } from "./Screens/LoginScreen";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import "react-native-gesture-handler";
// import { Home } from "./Screens/Home";
// import { CommentsScreen } from "./Screens/CommentsScreen";
// import { MapScreen } from "./Screens/MapScreen";
// import { Pressable, Text } from "react-native";
// import { ButtonGoBack } from "./components/Button";

// import { PersistGate } from 'redux-persist/integration/react';
// import { Provider } from 'react-redux';
// import {store, persistor} from './redux/store';

// const MainStack = createStackNavigator();

// export const useRoute = isAuth => {

//     return (

//       <MainStack.Navigator initialRouteName="RegistrationScreen">
//           if (!isAuth) {
//           <>
//         <MainStack.Screen
//           name="RegistrationScreen"
//           component={RegistrationScreen}
//           options={{
//             headerShown: false,
//           }}
//         />

//         <MainStack.Screen
//           name="LoginScreen"
//           component={LoginScreen}
//           options={{
//             headerShown: false,
//           }}
//         />
// </>

//     }

// <>

//         <MainStack.Screen
//           name="Home"
//           component={Home}
//           options={{ headerShown: false }}
//         />

//         <MainStack.Screen
//           name="CommentsScreen"
//           component={CommentsScreen}
//           options={{
//             // headerShown: false,
//             title: "Коментарі",
//             headerLeft: () => (
//               <ButtonGoBack />
//             ),
//             headerTitleStyle: {
//               fontFamily: "Roboto500",
//               color: "#212121",
//             },
//             headerStyle: {
//               boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
//               borderBottomWidth: 1,
//               borderBottomColor: "#E8E8E8",
//             },
//           }}
//         />

//         <MainStack.Screen
//           name="MapScreen"
//           component={MapScreen}
//           options={{
//             // headerShown: false
//             title: "Карта",
//             headerLeft: () => <ButtonGoBack />,
//             headerTitleStyle: {
//               fontFamily: "Roboto500",
//               color: "#212121",
//             },
//             headerStyle: {
//               boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
//               borderBottomWidth: 1,
//               borderBottomColor: "#E8E8E8",
//             },
//           }}
//         />
// </>
//       </MainStack.Navigator>
//    );
// }
