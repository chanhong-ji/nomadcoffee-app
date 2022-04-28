import { useReactiveVar } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import styled, { DefaultTheme, ThemeContext } from "styled-components/native";
import { loggedInVar } from "../apollo";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import SearchNav from "./SearchNav";
import SearchBar from "../components/SearchBar";

const Tab = createBottomTabNavigator();

const Title = styled.Text`
  color: ${(props) => props.theme.color.accent};
  font-size: 20px;
  font-weight: 600;
`;
const HeaderContainer = styled.View`
  height: 110px;
  background-color: ${(props) => props.theme.color.secondBg};
  justify-content: flex-end;
`;

function Nav() {
  const theme: DefaultTheme = useContext(ThemeContext);
  const loggedIn = useReactiveVar(loggedInVar);

  const headerTitle = () => <Title>Nomad coffee</Title>;
  const Header = () => (
    <HeaderContainer>
      <SearchBar />
    </HeaderContainer>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.color.secondBg,
          justifyContent: "center",
          shadowColor: theme.color.border,
          shadowOpacity: 0.1,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.color.accent,

        headerTitle,
        headerStyle: {
          backgroundColor: theme.color.secondBg,
          shadowColor: theme.color.border,
        },
        headerTitleStyle: {
          color: theme.color.accent,
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
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={focused ? 32 : 27}
            />
          ),
          header: Header,
        }}
      >
        {SearchNav}
      </Tab.Screen>
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
