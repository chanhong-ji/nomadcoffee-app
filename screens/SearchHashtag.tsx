import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import { useIsFocused } from "@react-navigation/native";
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
  searchCoffeeShopWithCategory,
  searchCoffeeShopWithCategory_searchCoffeeShopWithCategory,
} from "../codegen/__generated__/searchCoffeeShopWithCategory";
import ShopBanner from "../components/ShopBanner";
import { SHOP_FRAGMENT } from "../fragment";

const SEARCH_WITH_HASHTAG_QUERY = gql`
  query searchCoffeeShopWithCategory($keyword: String!, $offset: Int) {
    searchCoffeeShopWithCategory(keyword: $keyword, offset: $offset) {
      ...ShopFragment
    }
  }
  ${SHOP_FRAGMENT}
`;

const renderItem: ListRenderItem<
  searchCoffeeShopWithCategory_searchCoffeeShopWithCategory | null
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

function SearchHashtag() {
  const focused = useIsFocused();
  const keywordVar = useReactiveVar(searchKeywordVar);
  const [prevKeyword, setPrevKeyword] = useState(keywordVar);
  const [refreshing, setRefreshing] = useState(false);
  const [searchWithHash, { data, loading, refetch, fetchMore }] =
    useLazyQuery<searchCoffeeShopWithCategory>(SEARCH_WITH_HASHTAG_QUERY);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const onEndReached = () => {
    fetchMore({
      variables: { offset: data?.searchCoffeeShopWithCategory?.length },
    });
  };

  useEffect(() => {
    if (focused && prevKeyword !== keywordVar) {
      searchWithHash({ variables: { keyword: keywordVar.toLowerCase() } });
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
      ) : data?.searchCoffeeShopWithCategory?.length === 0 ? (
        <MessageContainer>
          <MessageText>No result for hashtag "{prevKeyword}"</MessageText>
        </MessageContainer>
      ) : (
        <FlatList
          data={data?.searchCoffeeShopWithCategory}
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

export default SearchHashtag;
