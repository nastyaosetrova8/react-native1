import { View, Text, StyleSheet, Image } from "react-native";
import { PostItem } from "../components/PostItem";


export const PostsScreen = () => {

  return (
    <View style={styles.section}>
      <View style={styles.userInfo}>
        <View style={styles.imgWrapper}>
          <Image
            source={require("../assets/images/avatar.jpg")}
            style={styles.userImg}
          />
        </View>
        <View>
          <Text style={styles.loginName}>Natali Romanova</Text>
          <Text style={styles.emailAdress}>email@example.com</Text>
        </View>
      </View>
      <PostItem />
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
    marginVertical: 32,
  },
  imgWrapper: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userImg: {
    width: "100%",
    overflow: "hidden",
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
});


