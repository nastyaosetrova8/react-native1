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
  Alert,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

export const CreatePostsScreen = () => {
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [coords, setCoords] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
    })();
    (async () => {
      const location = await Location.getCurrentPositionAsync();
      setCoords(location);
    })();

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  // +++++++++++++++++++++++++++++++
  if (hasPermission === null) {
    return <View />;
  }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
  // ++++++++++++++++++++++++++++++++++

  const getLocation = async () => {
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude: coords.coords.latitude,
        longitude: coords.coords.longitude,
      });
      setLocation(`${address[0].city}, ${address[0].country}`);
    } catch (error) {
      console.log(error);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setImg(uri);
      await MediaLibrary.createAssetAsync(uri);
      getLocation();
    }
  };

  const handleSharePost = () => {
    if (!img || !title || !location) {
      return Alert.alert("Fill in all fields");
    }
    getLocation();
    navigation.navigate("PostsScreen");
    restartImg();
    setTitle("");
    setLocation(null);
  };
  function restartImg() {
    setImg(null);
    setLocation(null);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.section}>
        <ScrollView>
          {img ? (
            <View style={styles.createImgWrapper}>
              <Image style={styles.imgStyle} source={{ uri: img }} />

              <Pressable
                style={{
                  ...styles.iconWrapper,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
                onPress={restartImg}
              >
                <FontAwesome name="camera" size={24} color="#FFFFFF" />
              </Pressable>
            </View>
          ) : (
            <Camera style={styles.camera} type={type} ref={setCameraRef}>
              <Pressable
                style={styles.flipContainer}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}> Flip </Text>
              </Pressable>

              <Pressable
                style={styles.iconWrapper}
                onPress={takePicture}
                // onPress={ async () => {
                //   if (cameraRef) {
                //     const { uri } = await cameraRef.takePictureAsync();
                //     await MediaLibrary.createAssetAsync(uri);
                //   }
                // }}
              >
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </Pressable>
            </Camera>
          )}

          <Pressable>
            {img ? (
              <Text style={styles.btnLoadText}>Редагувати фото</Text>
            ) : (
              <Text style={styles.btnLoadText}>Завантажте фото</Text>
            )}
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
              placeholderTextColor="#BDBDBD"
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
                value={location}
                placeholder="Місцевість..."
                onChangeText={setLocation}
                placeholderTextColor="#BDBDBD"
                style={{ ...styles.inputCreate, paddingLeft: 28 }}
              />
            </View>
            <Pressable
              style={{
                ...styles.puplishBtn,
                backgroundColor: img ? "#FF6C00" : "#F6F6F6",
              }}
              onPress={handleSharePost}
            >
              <Text
                style={{
                  ...styles.puplishBtnText,
                  color: img ? "#FFFFFF" : "#BDBDBD",
                }}
              >
                Опублікувати
              </Text>
            </Pressable>
          </KeyboardAvoidingView>
        </ScrollView>

        <Pressable style={styles.deleteBtn}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </Pressable>
        {/* </ScrollView> */}
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
  camera: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
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
  flipContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
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
    color: "#212121",
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
    // marginTop: 100,
    marginBottom: 32,
    paddingHorizontal: 23,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});
