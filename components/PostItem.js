import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export const PostItem = () => {
  return (
    <View style={styles.postWrapper}>
      <Image
        source={require("../assets/images/sunset.jpg")}
        style={styles.postImage}
      />
      <Text style={styles.postTitle}>Захід на Чорному морі</Text>
      <View style={styles.postItemsWrapper}>
        <View style={styles.postDesc}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="chatbubble-sharp" size={24} color="#FF6C00" />
            <Text style={styles.count}>3</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.actionBtn, marginLeft: 24 }}>
            <Feather name="thumbs-up" size={24} color="#FF6C00" />
            <Text style={styles.count}>200</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.actionBtn}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={{ ...styles.count, textDecorationLine: "underline" }}>
            Ukraine
          </Text>
        </TouchableOpacity>
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
    marginBottom: 35,
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
