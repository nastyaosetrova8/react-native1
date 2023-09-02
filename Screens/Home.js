import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { PostsScreen } from "../Screens/PostsScreen";
import { CreatePostsScreen } from "../Screens/CreatePostsScreen";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    navigation.navigate("RegistrationScreen");
  };
  const handleToPosts = () => {
    navigation.navigate("PostsScreen");
  };

  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 9,
          paddingHorizontal: 90,
          // boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
          //   borderTopWidth: 0.3,
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
            <Pressable style={{ marginRight: 16 }} onPress={handleSignOut}>
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
          headerLeft: () => (
            <Pressable style={{ marginLeft: 16 }} onPress={handleToPosts}>
              <AntDesign name="arrowleft" size={24} color="#212121CC" />
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
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="Profile"
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