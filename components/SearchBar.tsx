import { useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { SubmitHandler, useForm } from "react-hook-form";
import { searchCoffeeShopWithNameVariables } from "../codegen/__generated__/searchCoffeeShopWithName";
import { useEffect } from "react";
import {
  CommonActions,
  useNavigation,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import { useReactiveVar } from "@apollo/client";
import { searchKeywordVar } from "../apollo";

const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;
const Input = styled.TextInput<{ windowWidth: number }>`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: ${(props) => props.windowWidth * 0.8}px;
  height: 40px;
  padding-left: 10px;
  margin-left: 5px;
`;

function SearchBar() {
  const navigation: any = useNavigation();
  const route = useRoute();
  const { register, handleSubmit, setValue, getValues } =
    useForm<searchCoffeeShopWithNameVariables>();
  const { width: windowWidth } = useWindowDimensions();

  const onValid: SubmitHandler<searchCoffeeShopWithNameVariables> = ({
    keyword,
  }) => {
    searchKeywordVar(keyword);
  };

  useEffect(() => {
    register("keyword", { required: true });
  }, [register]);

  return (
    <Wrapper>
      <Ionicons name="search" size={25} color="rgba(0, 0, 0, 0.6)" />
      <Input
        windowWidth={windowWidth}
        onChangeText={(text) => setValue("keyword", text)}
        onSubmitEditing={handleSubmit(onValid)}
        placeholder="Search Cafe..."
        placeholderTextColor="rgba(0, 0, 0, 0.6)"
        returnKeyType="search"
      />
    </Wrapper>
  );
}

export default SearchBar;
