import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const tokenVar = makeVar("");
export const loggedInVar = makeVar(false);

export const getUserLogin = async (token: string) => {
  await AsyncStorage.setItem("token", token);
  tokenVar(token);
  loggedInVar(true);
};

export const getUserLogout = async () => {
  await AsyncStorage.removeItem("token");
  tokenVar("");
  loggedInVar(false);
  if (Platform.OS === "web") window.location.reload();
};

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_URI,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
