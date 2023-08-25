import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import AddSvg from "../assets/images/add.svg";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.regSection}>
      <View style={styles.avatarWrapper}>
        <AddSvg style={styles.addSvgStyle} />
      </View>

      <Text style={styles.title}>Реєстрація</Text>
      <View style={styles.form}>
        <TextInput
          name="login"
          value={login}
          placeholder="Логін"
          onChangeText={setLogin}
          placeholderTextColor="#BDBDBD"
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
          style={{
            ...styles.input,
            marginBottom: 16,
            borderColor: email ? "#FF6C00" : "#E8E8E8",
            backgroundColor: email ? "#FFFFFF" : "#F6F6F6",
          }}
        />
        <View>
          <TextInput
            name="password"
            value={password}
            placeholder="Пароль"
            onChangeText={setPassword}
            placeholderTextColor="#BDBDBD"
            style={{
              ...styles.input,
              borderColor: password ? "#FF6C00" : "#E8E8E8",
              backgroundColor: password ? "#FFFFFF" : "#F6F6F6",
            }}
          />
          <Pressable style={styles.showPassword}>
            <Text style={styles.showPasswordText}>Показати</Text>
          </Pressable>
        </View>

        <TouchableOpacity style={styles.formBtn}>
          <Text style={styles.formBtnTitle}>Зареєструватися</Text>
        </TouchableOpacity>

        <Pressable>
          <Text style={styles.linkToLogin}>Вже є акаунт? Увійти</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  regSection: {
    position: "relative",
    width: "100%",
    height: 549,
    padding: 16,
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
    maxWidth: "100%",
    marginTop: 43,
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
