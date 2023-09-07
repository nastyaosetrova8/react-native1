import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Alert,
} from "react-native";
import { useState } from "react";
import bgImg from "../assets/images/bgImg.png";
import { togglePasswordVisibility } from "../helpers/passwordVisibility";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../redux/operations";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const { passwordVisibility, show, handlePasswordVisibility } =
    togglePasswordVisibility();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    if (!email || !password) {
      return Alert.alert("Fill in all fields");
    }
    // Alert.alert("Welcome", `${email}`);

    dispatch(authSignInUser({ email, password }));
    resetForm();
  };
  function resetForm() {
    setEmail("");
    setPassword("");
  }

  const handleEmailFocus = () => {
    setEmailFocus(!emailFocus);
  };
  const handlePasswordFocus = () => {
    setPasswordFocus(!passwordFocus);
  };

  return (
    <>
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground source={bgImg} style={styles.image}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              keyboardVerticalOffset={-150}
            >
              <View style={styles.regSection}>
                <Text style={styles.title}>Увійти</Text>
                <TextInput
                  value={email}
                  placeholder="Адреса електронної пошти"
                  onChangeText={(text) => setEmail(text)}
                  placeholderTextColor="#BDBDBD"
                  keyboardType="email-address"
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailFocus}
                  autoCapitalize="none"
                  style={{
                    ...styles.input,
                    marginBottom: 16,
                    borderColor: emailFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: emailFocus ? "#FFFFFF" : "#F6F6F6",
                  }}
                />
                <View style={{ width: "100%" }}>
                  <TextInput
                    value={password}
                    placeholder="Пароль"
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={passwordVisibility}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordFocus}
                    style={{
                      ...styles.input,
                      marginBottom: 43,
                      borderColor: passwordFocus ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: passwordFocus ? "#FFFFFF" : "#F6F6F6",
                    }}
                  />
                  <Pressable
                    onPress={handlePasswordVisibility}
                    style={styles.showPassword}
                  >
                    <Text style={styles.showPasswordText}>{show}</Text>
                  </Pressable>
                </View>

                <View style={{ width: "100%" }}>
                  <TouchableOpacity
                    onPress={handleSignIn}
                    style={styles.formBtn}
                  >
                    <Text style={styles.formBtnTitle}>Увійти</Text>
                  </TouchableOpacity>

                  <Pressable
                    onPress={() => navigation.navigate("RegistrationScreen")}
                  >
                    <Text style={styles.linkToLogin}>
                      Немає акаунту? Зареєструватися
                    </Text>
                  </Pressable>
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
  title: {
    marginTop: 32,
    marginBottom: 33,
    fontFamily: "Roboto500",
    fontSize: 30,
  },
  form: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: 16,
    height: 50,
    fontFamily: "Roboto400",
    fontSize: 16,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E8E8",
  },
  formBtn: {
    width: "100%",
    marginBottom: 16,
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  formBtnTitle: {
    fontFamily: "Roboto400",
    fontSize: 16,
    color: "#ffffff",
  },
  linkToLogin: {
    // marginBottom: 45,
    marginBottom: 132,
    textAlign: "center",
    fontFamily: "Roboto400",
    fontSize: 16,
    color: "#1B4371",
  },
  showPassword: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  showPasswordText: {
    fontFamily: "Roboto400",
    fontSize: 16,
    color: "#1B4371",
  },
});
