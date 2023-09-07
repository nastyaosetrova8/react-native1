import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getCountFromServer,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const PostItem = ({
  img,
  title,
  location,
  coords,
  postId,
  likes,
}) => {
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(null);
  const navigation = useNavigation();

  const onLike = async () => {
    setIsLike(!isLike);

    if (isLike) {
      await updateDoc(doc(db, "posts", postId), {
        like: likes - 1,
      });
      return;
    }
    await updateDoc(doc(db, "posts", postId), {
      like: likes ? likes + 1 : 1,
    });
    return;
  };

  const getCommentsCount = async () => {
    try {
      const coll = collection(db, "posts", postId, "comments");
      const snapshot = await getCountFromServer(coll);
      setCount(snapshot.data().count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCommentsCount();
  }, []);

  const locationDesc = location.slice(0, 20);
  return (
    <View style={styles.postWrapper}>
      <Image source={{ uri: img }} style={styles.postImage} />
      <Text style={styles.postTitle}>{title}</Text>
      <View style={styles.postItemsWrapper}>
        <View style={styles.postDesc}>
          <Pressable
            style={styles.actionBtn}
            onPress={() =>
              navigation.navigate("CommentsScreen", { img, postId })
            }
          >
            <Ionicons name="chatbubble-sharp" size={24} color="#FF6C00" />
            <Text style={styles.count}>{count}</Text>
          </Pressable>

          <Pressable
            style={{ ...styles.actionBtn, marginLeft: 24 }}
            onPress={onLike}
          >
            <Feather name="thumbs-up" size={24} color="#FF6C00" />
            <Text style={styles.count}>{likes ? likes : 0}</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.actionBtn}
          onPress={() =>
            navigation.navigate("MapScreen", { coords, title, location })
          }
        >
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={{ ...styles.count, textDecorationLine: "underline" }}>
            {locationDesc}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postWrapper: {
    marginBottom: 32,
  },
  postImage: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  postTitle: {
    marginBottom: 8,
    fontFamily: "Roboto500",
    fontSize: 16,
    color: "#212121",
  },
  postItemsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postDesc: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontFamily: "Roboto400",
    marginLeft: 6,
    fontSize: 16,
    color: "#212121",
  },
});
