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
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import bgImg from "../assets/images/bgImg.png";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Feather, AntDesign } from "@expo/vector-icons";
import { PostItem } from "../components/PostItem";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSingOutUser } from "../redux/operations";
import { db } from "../firebase/config";
import { query, collection, where, onSnapshot, doc } from "firebase/firestore";

export const InitialProfileScreen = () => {
  const { nickname, avatar, userId } = useSelector((state) => state.auth);
  const [img, setImg] = useState(null);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setImg(avatar);
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allPosts = [];
      querySnapshot.forEach((doc) => {
        allPosts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(allPosts);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImg(result.assets[0].uri);
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
                  <Image source={{ uri: img }} style={styles.avatarImg} />
                  {img ? (
                    <Pressable
                      style={styles.avatarIcon}
                      onPress={() => {
                        setImg(null);
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

                <Text style={styles.title}>{nickname}</Text>
                <Pressable
                  style={styles.logoutProfile}
                  onPress={() => dispatch(authSingOutUser())}
                >
                  <Feather name="log-out" size={24} color="#BDBDBD" />
                </Pressable>

                <SafeAreaView style={styles.postsSection}>
                  <FlatList
                    data={posts}
                    renderItem={({ item }) => (
                      <PostItem
                        img={item.img}
                        title={item.title}
                        location={item.location}
                        navigation={navigation}
                        coords={item.coords}
                        postId={item.id}
                        likes={item.like}
                      />
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </SafeAreaView>
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
  logoutProfile: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  postsSection: {
    flexGrow: 1,
    width: "100%",
    marginTop: 32,
    backgroundColor: "#FFFFFF",
  },
});
