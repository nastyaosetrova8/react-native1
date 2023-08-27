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
import AddSvg from "../assets/images/add.svg";
import bgImg from "../assets/images/bgImg.png";
import { togglePasswordVisibility } from "../helpers/passwordVisibility";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const { passwordVisibility, show, handlePasswordVisibility } =
    togglePasswordVisibility();

  const handleSignIn = () => {
    if (!email || !password) {
      return Alert.alert("Fill in all fields");
    }
    Alert.alert("Credentials", `${email} + ${password}`);
    console.warn("Welcome!");

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground source={bgImg} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-150}
          >
            <View style={styles.regSection}>
              <View style={styles.avatarWrapper}>
                <AddSvg style={styles.addSvgStyle} />
              </View>

              <Text style={styles.title}>Увійти</Text>
              <TextInput
                name="email"
                value={email}
                placeholder="Адреса електронної пошти"
                onChangeText={setEmail}
                placeholderTextColor="#BDBDBD"
                keyboardType="email-address"
                onFocus={handleEmailFocus}
                onBlur={handleEmailFocus}
                style={{
                  ...styles.input,
                  marginBottom: 16,
                  borderColor: emailFocus ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: emailFocus ? "#FFFFFF" : "#F6F6F6",
                }}
              />
              <View style={{ width: "100%" }}>
                <TextInput
                  name="password"
                  value={password}
                  placeholder="Пароль"
                  onChangeText={setPassword}
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
                <TouchableOpacity onPress={handleSignIn} style={styles.formBtn}>
                  <Text style={styles.formBtnTitle}>Зареєструватися</Text>
                </TouchableOpacity>

                <Pressable>
                  <Text style={styles.linkToLogin}>Вже є акаунт? Увійти</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    marginBottom: 45,
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
