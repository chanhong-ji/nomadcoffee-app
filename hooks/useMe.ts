import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { getUserLogout, loggedInVar } from "../apollo";
import { me } from "../codegen/__generated__/me";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      name
      avatarURL
      totalFollowers
      totalFollowing
      isFollowing
      isMe
    }
  }
`;

function useMe() {
  const loggedIn = useReactiveVar(loggedInVar);
  const { data } = useQuery<me>(ME_QUERY, {
    skip: loggedIn !== true,
  });
  useEffect(() => {
    if (data?.me === null) getUserLogout();
  }, [data]);
  return data;
}

export default useMe;
