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
  Image,
} from "react-native";
import { useState } from "react";
import bgImg from "../assets/images/bgImg.png";
import { togglePasswordVisibility } from "../helpers/passwordVisibility";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { authSignUpUser } from "../redux/operations";
import { useDispatch } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loginFocus, setLoginFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const { passwordVisibility, show, handlePasswordVisibility } =
    togglePasswordVisibility();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const saveAvatar = async () => {
    try {
      const response = await fetch(avatar);
      const file = await response.blob();
      await uploadBytes(ref(storage, `avatars/${file._data.blobId}`), file);
      const imgUrl = await getDownloadURL(
        ref(storage, `avatars/${file._data.blobId}`)
      );
      return imgUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async () => {
    if (!login || !email || !password) {
      return Alert.alert("Fill in all fields");
    }
    const avatar = await saveAvatar();
    dispatch(authSignUpUser({ email, password, login, avatar }));
    resetForm();
  };
  function resetForm() {
    setLogin("");
    setEmail("");
    setPassword("");
    setAvatar(null);
  }

  const handleLoginFocus = () => {
    setLoginFocus(!loginFocus);
  };
  const handleEmailFocus = () => {
    setEmailFocus(!emailFocus);
  };
  const handlePasswordFocus = () => {
    setPasswordFocus(!passwordFocus);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
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
                <View style={styles.avatarWrapper}>
                  <Image source={{ uri: avatar }} style={styles.avatarImg} />
                  {avatar ? (
                    <Pressable
                      style={styles.avatarIcon}
                      onPress={() => {
                        setAvatar(null);
                      }}
                    >
                      <AntDesign
                        name="closecircleo"
                        size={25}
                        color="#BDBDBD"
                      />
                    </Pressable>
                  ) : (
                    <Pressable style={styles.avatarIcon} onPress={pickImage}>
                      <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                    </Pressable>
                  )}
                </View>

                <Text style={styles.title}>Реєстрація</Text>
                <TextInput
                  value={login}
                  placeholder="Логін"
                  onChangeText={(text) => setLogin(text)}
                  placeholderTextColor="#BDBDBD"
                  onFocus={handleLoginFocus}
                  onBlur={handleLoginFocus}
                  style={{
                    ...styles.input,
                    marginBottom: 16,
                    borderColor: loginFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: loginFocus ? "#FFFFFF" : "#F6F6F6",
                  }}
                />
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
                    onPress={handleSignUp}
                    style={styles.formBtn}
                  >
                    <Text style={styles.formBtnTitle}>Зареєструватися</Text>
                  </TouchableOpacity>

                  <Pressable onPress={() => navigation.navigate("LoginScreen")}>
                    <Text style={styles.linkToLogin}>Вже є акаунт? Увійти</Text>
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
  avatarWrapper: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  avatarIcon: {
    position: "absolute",
    bottom: 14,
    right: -13,
    borderRadius: 50,
    backgroundColor: "#fff",
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
