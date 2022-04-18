import AppLoading from "expo-app-loading";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";
import Font from "expo-font";

export default function App() {
  const [loading, setLoading] = useState(true);

  const preload = async () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const assetsToLoad = [require("./assets/icon.png")];
    const assetPromises = assetsToLoad.map((asset) => Asset.loadAsync(asset));
    await Promise.all<Promise<void> | Promise<Asset[]>>(fontPromises);
  };

  const onFinish = () => {
    setLoading(false);
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onFinish={onFinish}
        onError={console.error}
      ></AppLoading>
    );
  }
  return <View></View>;
}
