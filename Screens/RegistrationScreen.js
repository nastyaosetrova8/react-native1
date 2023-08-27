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
  ScrollView,
  Alert
} from "react-native";
import { useEffect, useState } from "react";
import AddSvg from "../assets/images/add.svg";

import bgImg from "../assets/images/bgImg.png";
import { StatusBar } from "expo-status-bar";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardShow, setKeyboardShow] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
const [show, setShow] = useState('Показати')
  

 
  const nandleSignUp = () => {
    if (!login || !email || !password) {
      return Alert.alert("Fill in all fields")
    }
    Alert.alert("Credentials", `${login} + ${email} + ${password}`);
    console.warn('Welcome!');

    resetForm();
  };
  function resetForm () {
    setLogin("");
    setEmail("");
    setPassword("");
  }

  const handlePasswordVisibility = () => {
    if (show === 'Показати') {
      setShow('Сховати');
      setPasswordVisibility(!passwordVisibility);
    } else if (show === 'Сховати') {
      setShow('Показати');
      setPasswordVisibility(!passwordVisibility);
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

<View style={styles.container}>
    <ImageBackground source={bgImg} style={styles.image}>
    <KeyboardAvoidingView 
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    keyboardVerticalOffset={-150}
    >
    

    <View 
    style={styles.regSection}
    // style={{...styles.regSection, marginBottom: showKeyboard ? 16 : 77}}
    >
      
      <View style={styles.avatarWrapper}>
        <AddSvg style={styles.addSvgStyle} />
      </View>

      <Text style={styles.title}>Реєстрація</Text>
      {/* <View style={styles.form}> */}
        <TextInput
          name="login"
          value={login}
          placeholder="Логін"
          onChangeText={setLogin}
          placeholderTextColor="#BDBDBD"
          // autoComplete="login"
          // autoFocus={true}
          style={{
            ...styles.input,
            marginBottom: 16,
            borderColor: login ? "#FF6C00" : "#E8E8E8",
            backgroundColor: login ? "#FFFFFF" : "#F6F6F6",
          }}
        />
        <TextInput
          name="email"
          value={email}
          placeholder="Адреса електронної пошти"
          onChangeText={setEmail}
          placeholderTextColor="#BDBDBD"
          // autoComplete="email"
          keyboardType="email-address"
          style={{
            ...styles.input,
            marginBottom: 16,
            borderColor: email ? "#FF6C00" : "#E8E8E8",
            backgroundColor: email ? "#FFFFFF" : "#F6F6F6",
          }}
        />
        <View 
        style={{width: "100%"}}
        >
          <TextInput
            name="password"
            value={password}
            placeholder="Пароль"
            onChangeText={setPassword}
            placeholderTextColor="#BDBDBD"
            // autoComplete="password"
            // keyboardType="password"
            secureTextEntry={passwordVisibility}
            style={{
              ...styles.input,
              // marginBottom: keyboardShow ? 32 : 43,
              marginBottom: 43,
              borderColor: password ? "#FF6C00" : "#E8E8E8",
              backgroundColor: password ? "#FFFFFF" : "#F6F6F6",
            }}
          />
          <Pressable onPress={handlePasswordVisibility} style={styles.showPassword}>
            <Text style={styles.showPasswordText}>{show}</Text>
          </Pressable>
        </View>

<View style={{width: "100%", 
// display: keyboardShow ? 'none' : 'flex'
}}>
        <TouchableOpacity 
        onPress={nandleSignUp} 
        style={styles.formBtn}>
          <Text style={styles.formBtnTitle}>Зареєструватися</Text>
        </TouchableOpacity>

        <Pressable>
          <Text style={styles.linkToLogin}>Вже є акаунт? Увійти</Text>
        </Pressable>

        </View>
      {/* </View> */}
      
    </View>
    </KeyboardAvoidingView>

    </ImageBackground>
    {/* <StatusBar style="auto" /> */}
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "flex-end",
    // alignItems: "center",
    paddingBottom: 30,
  },
  image: {
    flex: 1,
    // width: "100%",
    justifyContent: "flex-end",
    resizeMode: "cover",
  },


  regSection: {

    position: "relative",
    width: "100%",
    // maxHeight: 549,
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
    // marginTop: 11,
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
