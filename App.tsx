import React, { useState } from "react";
import { Appearance } from "react-native";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { client, loggedInVar, tokenVar } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Nav from "./Nav";

export default function App() {
  const [dark, setDark] = useState(Appearance.getColorScheme() === "dark");
  const [loading, setLoading] = useState(true);

  const preloadAssets = async () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const assetsToLoad = [require("./assets/icon.png")];
    const assetPromises = assetsToLoad.map((asset) => Asset.loadAsync(asset));
    await Promise.all<Promise<void> | Promise<Asset[]>>([
      ...fontPromises,
      ...assetPromises,
    ]);
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      tokenVar(token);
      loggedInVar(true);
    }
    return preloadAssets();
  };

  const onFinish = () => {
    setLoading(false);
  };

  Appearance.addChangeListener(({ colorScheme }) => {
    setDark(colorScheme === "dark");
  });

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onFinish={onFinish}
        onError={console.error}
      ></AppLoading>
    );
  }
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Nav />
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}
