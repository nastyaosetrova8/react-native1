import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import { PostItem } from "../components/PostItem";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const InitialPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { nickname, email, avatar } = useSelector((state) => state.auth);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("date", "desc"));
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

  return (
    <View style={styles.section}>
      <View style={styles.userInfo}>
        <View style={styles.imgWrapper}>
          <Image
            source={{ uri: avatar }}
            style={styles.userImg}
          />
        </View>
        <View>
          <Text style={styles.loginName}>{nickname}</Text>
          <Text style={styles.emailAdress}>{email}</Text>
        </View>
      </View>
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
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
  },
  imgWrapper: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#BDBDBD",
  },
  userImg: {
    width: "100%",
    height: "100%",
  },
  loginName: {
    fontFamily: "Roboto700",
    fontSize: 13,
    color: "#212121",
  },
  emailAdress: {
    fontFamily: "Roboto400",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postsSection: {
    flexGrow: 1,
    width: "100%",
    marginTop: 32,
    marginBottom: 32,
    backgroundColor: "#FFFFFF",
  },
});
