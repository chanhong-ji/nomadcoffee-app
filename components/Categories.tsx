import styled, { ThemeContext } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";

const Container = styled.View`
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.color.accent};
  flex-direction: row;
  padding: 10px;
`;
const Item = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${(props) => props.theme.color.accent};
  opacity: 0.9;
  border-radius: 15px;
  margin-right: 7px;
`;
const ItemText = styled.Text`
  color: ${(props) => props.theme.color.secondBg};
`;

function Categories() {
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <Ionicons
        name="search"
        color={theme.color.accent}
        size={30}
        style={{ marginRight: 5 }}
      />
      {["cute", "cozy", "cheap"].map((category) => (
        <Item key={category}>
          <ItemText>{category}</ItemText>
        </Item>
      ))}
    </Container>
  );
}

export default Categories;
