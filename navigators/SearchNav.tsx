import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import SearchHashtag from "../screens/SearchHashtag";
import SearchName from "../screens/SearchName";

const Tab = createMaterialTopTabNavigator();

function SearchNav() {
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: theme.color.accent },
      }}
      keyboardDismissMode="auto"
    >
      <Tab.Screen name="Title" component={SearchName} />
      <Tab.Screen name="Hashtag" component={SearchHashtag} />
    </Tab.Navigator>
  );
}

export default SearchNav;
