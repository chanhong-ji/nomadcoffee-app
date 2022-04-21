import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, Button, View } from "react-native";
import styled from "styled-components/native";
import { getUserLogin } from "../apollo";
import { login, loginVariables } from "../codegen/__generated__/login";

interface IForm {
  username: string;
  password: string;
}

const Input = styled.TextInput`
  color: ${(props) => props.theme.color.text};
`;

const toNext = (nextRef: React.MutableRefObject<any>) =>
  nextRef.current.focus();

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

function Login() {
  const passwordRef = useRef(null);
  const { register, handleSubmit, watch, setValue } = useForm<IForm>();

  const onValid: SubmitHandler<IForm> = ({ username, password }) => {
    login({
      variables: { username, password },
      onCompleted: async (data) => {
        const {
          login: { ok, token, error },
        } = data;
        if (!ok) return Alert.alert("Fail to login", String(error));
        if (token) await getUserLogin(token);
      },
    });
  };

  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION
  );

  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);

  return (
    <View>
      <Input
        placeholder="username"
        autoCapitalize="none"
        autoFocus
        returnKeyType="next"
        placeholderTextColor="grey"
        onSubmitEditing={() => toNext(passwordRef)}
        onChangeText={(text: string) => setValue("username", text)}
      />
      <Input
        placeholder="password"
        autoCapitalize="none"
        textContentType="password"
        returnKeyType="done"
        secureTextEntry
        clearTextOnFocus
        placeholderTextColor="grey"
        onChangeText={(text: string) => setValue("password", text)}
        ref={passwordRef}
        onSubmitEditing={handleSubmit(onValid)}
      />
      <Button title="Login" onPress={handleSubmit(onValid)} />
    </View>
  );
}

export default Login;
