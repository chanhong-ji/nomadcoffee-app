import { useReactiveVar } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { DefaultTheme, ThemeContext } from "styled-components/native";
import { loggedInVar } from "./apollo";
import { Ionicons } from "@expo/vector-icons";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Search from "./screens/Search";

const Tab = createBottomTabNavigator();

function Nav() {
  const theme: DefaultTheme = useContext(ThemeContext);
  const loggedIn = useReactiveVar(loggedInVar);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.color.bg,
          justifyContent: "center",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.color.text,
        headerStyle: {
          backgroundColor: theme.color.bg,
        },
        headerTitleStyle: {
          color: theme.color.text,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: theme.color.bg,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={focused ? 28 : 25}
            ></Ionicons>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={focused ? 32 : 27}
            ></Ionicons>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={loggedIn ? Profile : Login}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={focused ? 30 : 25}
            ></Ionicons>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Nav;
