import { CompositeScreenProps } from "@react-navigation/native";
import { useEffect } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import useMe from "../hooks/useMe";

const Wrapper = styled.View`
  background-color: ${(props) => props.theme.color.bg};
`;
const Container = styled.ScrollView``;
const Top = styled.View``;
const Avatar = styled.Image`
  width: 40;
  height: 40;
`;
const Username = styled.Text`
  color: ${(props) => props.theme.color.text};
`;
const Items = styled.View``;
const TotalFollower = styled.View``;
const TotalFollwind = styled.View``;

function Profile({ navigation }: CompositeScreenProps<any, any>) {
  const data = useMe();

  useEffect(() => {
    navigation.setOptions({ title: `${data?.me?.username}'s Profile` });
  }, []);

  return (
    <Wrapper>
      {data?.me && (
        <Container>
          <Top>
            {data.me?.avatarURL && (
              <Avatar source={{ uri: data.me.avatarURL }} />
            )}
            <Username>{data.me.username}</Username>
          </Top>
          <Items>
            <TotalFollower>
              <Text>{data.me.totalFollowers}</Text>
            </TotalFollower>
            <TotalFollwind>
              <Text>{data.me.totalFollowing}</Text>
            </TotalFollwind>
          </Items>
          <Text>Profile</Text>
        </Container>
      )}
    </Wrapper>
  );
}

export default Profile;
