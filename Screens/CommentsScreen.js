import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";


export const CommentsScreen = () => {
  const [img, setImg] = useState(null);
  const [commentItem, setCommentItem] = useState("");

  const handleSendComment = async () => {
    setCommentItem("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.section}>
        <ScrollView>
          <View style={styles.createImgWrapper}>
            <Image style={styles.imgStyle} source={{ uri: img }} />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={500}
            style={{ flex: 1 }}
          >
            <View>
              <TextInput
                value={commentItem}
                placeholder="Коментувати..."
                onChangeText={setCommentItem}
                placeholderTextColor="#BDBDBD"
                style={{ ...styles.inputCreateComment, paddingLeft: 28 }}
              />

              <Pressable
                style={styles.sendCommentBtn}
                onPress={handleSendComment}
              >
                <AntDesign name="arrowup" size={24} color="#FFFFFF" />
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#ffffff",
  },
  createImgWrapper: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    overflow: "hidden",
    backgroundColor: "#F6F6F6",
  },
  imgStyle: {
    width: "100%",
    height: "100%",
  },
  inputCreateComment: {
    width: "100%",
    padding: 16,
    fontFamily: "Roboto400",
    fontSize: 16,
    color: "#212121",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  sendCommentBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
});
