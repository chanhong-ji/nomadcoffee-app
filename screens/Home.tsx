import { gql, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { FlatList, View } from "react-native";
import { ThemeContext } from "styled-components/native";
import { seeCoffeeShops } from "../codegen/__generated__/seeCoffeeShops";
import Categories from "../components/Categories";
import ShopBanner from "../components/ShopBanner";

const SEE_COFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      id
      name
      categories {
        name
      }
      mainPhoto {
        url
      }
      isLiked
      isMine
      likeCount
    }
  }
`;

function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const theme = useContext(ThemeContext);

  const { data, loading, refetch, fetchMore } = useQuery<seeCoffeeShops>(
    SEE_COFFEESHOPS_QUERY,
    { variables: { offset: 0 } }
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Categories />
      {data?.seeCoffeeShops !== undefined && (
        <FlatList
          numColumns={2}
          style={{
            padding: 2,
            paddingTop: 10,
          }}
          data={data?.seeCoffeeShops}
          renderItem={({ item, index }) =>
            item ? <ShopBanner {...item} index={index} /> : null
          }
          keyExtractor={(item, index) => String(item?.id)}
          onEndReached={() =>
            fetchMore({
              variables: { offset: data?.seeCoffeeShops?.length },
            })
          }
          onEndReachedThreshold={1}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: "100%",
                backgroundColor: theme.color.border,
                height: 1,
              }}
            ></View>
          )}
        />
      )}
    </View>
  );
}

export default Home;
