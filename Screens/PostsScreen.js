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
    Dimensions
  } from "react-native";
  import { useEffect, useState } from "react";
  import AddSvg from "../assets/images/add.svg";
  
  import bgImg from "../assets/images/bgImg.png";
  import { StatusBar } from "expo-status-bar";

  
  export const PostsScreen = () => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    
    const handleLogin = text => setLogin(text);
    const handleEmail = text => setEmail(text);
    const handlePassword = text => setPassword(text);
  
  
    // useEffect(() => {
    //   const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
    //     setKeyboardVisible(true);
    //   });
    //   const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
    //     setKeyboardVisible(false);
    //   });
  
    //   return () => {
    //     showSubscription.remove();
    //     hideSubscription.remove();
    //   };
    // }, []);
  
  
    const onPressWithoutFeedback = () => {
        setKeyboardVisible(false);
        Keyboard.dismiss();
      };
  
    return (
    <TouchableWithoutFeedback onPress={onPressWithoutFeedback}> 
  
  {/* <View style={styles.container}> */}
      <ImageBackground source={bgImg} style={styles.image}>
  
      <TouchableWithoutFeedback onPress={onPressWithoutFeedback}> 

      <View 
    //   style={styles.regSection}
      style={{...styles.regSection, marginBottom: keyboardVisible ? -162 : 0,}}
      >
      <KeyboardAvoidingView 
      // enabled
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ScrollView>
        
        <View style={styles.avatarWrapper}>
          <AddSvg style={styles.addSvgStyle} />
        </View>
  
        <Text style={styles.title}>Реєстрація</Text>
        <View style={styles.form}>
          <TextInput
            name="login"
            value={login}
            placeholder="Логін"
            onChangeText={handleLogin}
            placeholderTextColor="#BDBDBD"
            autoFocus
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
            onChangeText={handleEmail}
            placeholderTextColor="#BDBDBD"
            keyboardType="email-address"
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
              onChangeText={handlePassword}
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
  
  {/* <View style={{ display: keyboardVisible ? 'none' : 'flex' }}> */}
          <TouchableOpacity 
          // onPress={nandleSubmit} 
          style={styles.formBtn}>
            <Text style={styles.formBtnTitle}>Зареєструватися</Text>
          </TouchableOpacity>
  
          <Pressable>
            <Text style={styles.linkToLogin}>Вже є акаунт?
            <Text style={styles.linkWordStyled}>Увійти</Text>
             </Text>
          </Pressable>
  
          {/* </View> */}
        </View>
        </ScrollView>

        </KeyboardAvoidingView>
      </View>

     
      </TouchableWithoutFeedback>
      
  
      </ImageBackground>
      {/* <StatusBar style="auto" /> */}
      {/* </View> */}
  
      </TouchableWithoutFeedback>
      
    );
  };
  

  const marginTop = 263
const wrapperHeight = Dimensions.get('screen').height - marginTop

  const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: "#fff",
      // justifyContent: "flex-end",
      // alignItems: "center",
    },
    image: {
      flex: 1,
      // width: "100%",
      justifyContent: "flex-end",
      resizeMode: "cover",
    },
  
  
    regSection: {
  marginTop: 263,

      position: "relative",
      // width: "100%",
      // height: 549,
      paddingHorizontal: 16,
      backgroundColor: "#ffffff",
    //   alignItems: "center",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingTop: 50,
      paddingBottom: 8,
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
      marginBottom: 66,
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
  

