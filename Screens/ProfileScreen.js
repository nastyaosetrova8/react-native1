import {
  View,
  StyleSheet,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import AddSvg from "../assets/images/add.svg";
import bgImg from "../assets/images/bgImg.png";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { PostItem } from "../components/PostItem";

export const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    navigation.navigate("RegistrationScreen");
  };

  return (
    <>
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground source={bgImg} style={styles.image}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              keyboardVerticalOffset={-150}>
              <View style={styles.regSection}>
                <View style={styles.avatarWrapper}>
                  <AddSvg style={styles.addSvgStyle} />
                </View>
                <Text style={styles.title}>Natali Romanova</Text>
                <Pressable style={styles.logoutProfile} onPress={handleSignOut}>
                  <Feather name="log-out" size={24} color="#BDBDBD" />
                </Pressable>
                <View style={styles.postsSection}>
                  <PostItem />
                </View>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 30,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  regSection: {
    position: "relative",
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarWrapper: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addSvgStyle: {
    position: "absolute",
    bottom: 8,
    right: -18,
  },
  title: {
    marginTop: 92,
    marginBottom: 33,
    fontFamily: "Roboto500",
    fontSize: 30,
  },
  logoutProfile: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  postsSection: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
});
