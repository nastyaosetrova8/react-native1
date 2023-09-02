import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const ButtonGoBack = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={{ marginLeft: 16 }}
      onPress={() => navigation.navigate("PostsScreen")}
    >
      <AntDesign name="arrowleft" size={24} color="#212121CC" />
    </Pressable>
  );
};
