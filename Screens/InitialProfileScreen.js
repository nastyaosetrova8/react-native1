import {
  View,
  StyleSheet,
  Text,
  Pressable,
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
        <View style={styles.section}>
          <ImageBackground source={bgImg} style={styles.image}>
            
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
                        style = {styles.postItem}
                      />
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </SafeAreaView>
              </View>
           
          </ImageBackground>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  regSection: {
    marginTop: 220,
    paddingTop: 50,
    paddingBottom: 96,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
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
  avatarWrapper: {
    position: "relative",
    width: 120,
    height: 120,
    marginTop: -110,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
    resizeMode: "cover",
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
    marginVertical: 33,
    fontFamily: "Roboto500",
    fontSize: 30,
    textAlign: "center",
    color: "#212121",
  },
  logoutProfile: {
    position: "absolute",
    top: 22,
    right: 16,
  },
});


