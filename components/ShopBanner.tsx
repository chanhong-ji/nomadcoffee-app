import { useNavigation } from "@react-navigation/native";
import { Alert, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { seeCoffeeShops_seeCoffeeShops } from "../codegen/__generated__/seeCoffeeShops";
import { Ionicons } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import {
  toggleLike,
  toggleLikeVariables,
} from "../codegen/__generated__/toggleLike";

const Container = styled.View`
  width: 50%;
`;
const MainPhotoContainer = styled.Pressable``;
const MainPhoto = styled.Image<{ windowWidth: number }>`
  height: ${(props) => props.windowWidth / 2}px;
  margin: 4px;
`;
const Info = styled.View`
  margin-left: 5px;
  margin-top: 3px;
`;
const Title = styled.Text`
  font-size: 17px;
  color: ${(props) => props.theme.color.text};
`;
const Like = styled.View`
  flex-direction: row;
  align-items: center;
`;
const LikeText = styled.Text`
  margin-left: 3px;
  color: ${(props) => props.theme.color.text};
`;
const Categories = styled.View`
  flex-direction: row;
  padding: 3px;
`;
const Category = styled.TouchableOpacity`
  margin-right: 5px;
`;
const CategoryText = styled.Text`
  color: ${(props) => props.theme.color.accent};
`;

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($shopId: Int!) {
    toggleLike(shopId: $shopId) {
      ok
      error
    }
  }
`;

function ShopBanner({
  id,
  name,
  categories,
  mainPhoto,
  isLiked,
  isMine,
  likeCount,
  index,
}: seeCoffeeShops_seeCoffeeShops & { index: number }) {
  const navigation = useNavigation();
  const { width: windowWidth } = useWindowDimensions();
  const [toggleLike] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: { shopId: id },
      update: (cache, { data }) => {
        if (!data?.toggleLike.ok)
          return Alert.alert("Fail", "Please login to save a coffee shop");
        cache.modify({
          id: `CoffeeShop:${id}`,
          fields: {
            isLiked: (prev) => !prev,
          },
        });
      },
    }
  );

  return (
    <Container>
      <MainPhotoContainer
        onPress={() => {
          console.log("photo clicked");
        }}
      >
        <MainPhoto
          source={{ uri: mainPhoto?.url }}
          resizeMode="cover"
          windowWidth={windowWidth}
        />
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={25}
          style={{
            position: "absolute",
            right: 10,
            top: 10,
          }}
          onPress={() => toggleLike()}
          color={isLiked ? "red" : "white"}
        />
      </MainPhotoContainer>
      <Info>
        <Title>{index + 1 + ". " + name}</Title>
        <Like>
          <Ionicons name="heart" color="red" />
          <LikeText>{likeCount}</LikeText>
        </Like>
        <Categories>
          {categories?.map((category) => (
            <Category
              key={category?.name}
              onPress={() => {
                //   navigation.navigate("Category");
              }}
            >
              <CategoryText>#{category?.name}</CategoryText>
            </Category>
          ))}
        </Categories>
      </Info>
    </Container>
  );
}
export default ShopBanner;
