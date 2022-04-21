/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_me {
  __typename: "User";
  id: number;
  username: string;
  name: string;
  avatarURL: string | null;
  totalFollowers: number;
  totalFollowing: number;
  isFollowing: boolean;
  isMe: boolean;
}

export interface me {
  me: me_me | null;
}
