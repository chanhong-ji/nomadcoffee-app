import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import { CompositeScreenProps, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  View,
} from "react-native";
import styled from "styled-components/native";
import { searchKeywordVar } from "../apollo";
import {
  searchCoffeeShopWithName,
  searchCoffeeShopWithName_searchCoffeeShopWithName,
} from "../codegen/__generated__/searchCoffeeShopWithName";
import ShopBanner from "../components/ShopBanner";
import { SHOP_FRAGMENT } from "../fragment";

const SEARCH_WITH_NAME_QUERY = gql`
  query searchCoffeeShopWithName($keyword: String!, $offset: Int) {
    searchCoffeeShopWithName(keyword: $keyword, offset: $offset) {
      ...ShopFragment
    }
  }
  ${SHOP_FRAGMENT}
`;

const renderItem: ListRenderItem<
  searchCoffeeShopWithName_searchCoffeeShopWithName | null
> = ({ item, index }) => {
  return item ? <ShopBanner {...item} index={index} width={100} /> : null;
};

const MessageContainer = styled.View``;
const MessageText = styled.Text`
  color: ${(props) => props.theme.color.text};
  margin-top: 20px;
  font-weight: 600;
  font-size: 15px;
`;

function SearchName({ navigation, route }: CompositeScreenProps<any, any>) {
  const focused = useIsFocused();
  const keywordVar = useReactiveVar(searchKeywordVar);
  const [prevKeyword, setPrevKeyword] = useState(keywordVar);
  const [refreshing, setRefreshing] = useState(false);
  const [searchWithName, { data, loading, refetch, fetchMore }] =
    useLazyQuery<searchCoffeeShopWithName>(SEARCH_WITH_NAME_QUERY);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const onEndReached = () => {
    fetchMore({
      variables: { offset: data?.searchCoffeeShopWithName?.length },
    });
  };

  useEffect(() => {
    if (focused && prevKeyword !== keywordVar) {
      searchWithName({ variables: { keyword: keywordVar.toLowerCase() } });
      setPrevKeyword(keywordVar);
    }
  }, [keywordVar, focused]);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
      }}
    >
      {loading ? (
        <ActivityIndicator />
      ) : data?.searchCoffeeShopWithName?.length === 0 ? (
        <MessageContainer>
          <MessageText>No result for title "{prevKeyword}"</MessageText>
        </MessageContainer>
      ) : (
        <FlatList
          data={data?.searchCoffeeShopWithName}
          style={{ width: "100%" }}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          onEndReachedThreshold={1}
        />
      )}
    </View>
  );
}

export default SearchName;
