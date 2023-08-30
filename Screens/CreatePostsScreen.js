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

import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

export const CreatePostsScreen = () => {
  const [title, setTitle] = useState("");
  const [locality, setLocality] = useState(null);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.section}>
        <ScrollView>
          <View style={styles.createImgWrapper}>
            <Image style={styles.imgStyle} />

            <Pressable style={styles.iconWrapper}>
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </Pressable>
          </View>

          <Pressable>
            <Text style={styles.btnLoadText}>Завантажте фото</Text>
          </Pressable>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={500}
            style={{ flex: 1 }}
          >
            <TextInput
              value={title}
              placeholder="Назва..."
              onChangeText={setTitle}
              style={{ ...styles.inputCreate, marginBottom: 16 }}
            />
            <View style={styles.inputMapWrapper}>
              <Feather
                style={styles.iconMap}
                name="map-pin"
                size={24}
                color="#BDBDBD"
              />
              <TextInput
                value={locality}
                placeholder="Місцевість..."
                onChangeText={setLocality}
                style={{ ...styles.inputCreate, paddingLeft: 28 }}
              />
            </View>

            <Pressable style={styles.puplishBtn}>
              <Text style={styles.puplishBtnText}>Опублікувати</Text>
            </Pressable>
          </KeyboardAvoidingView>

          <Pressable style={styles.deleteBtn}>
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </Pressable>
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
    backgroundColor: "#F6F6F6",
  },
  imgStyle: {
    width: "100%",
    overflow: "hidden",
  },

  iconWrapper: {
    position: "absolute",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  btnLoadText: {
    marginBottom: 32,
    fontFamily: "Roboto400",
    fontSize: 16,
    color: "#BDBDBD",
  },

  inputCreate: {
    width: "100%",
    paddingVertical: 16,
    fontFamily: "Roboto400",
    fontSize: 16,
    color: "#BDBDBD",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  inputMapWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  iconMap: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -12 }],
    flexDirection: "row",
    alignItems: "center",
  },

  puplishBtn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  puplishBtnText: {
    fontFamily: "Roboto400",
    fontSize: 16,
    color: "#BDBDBD",
  },
  deleteBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 120,
    paddingHorizontal: 23,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});
