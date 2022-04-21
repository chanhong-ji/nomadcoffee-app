/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserFragment
// ====================================================

export interface UserFragment {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  name: string;
  location: string | null;
  avatarURL: string | null;
  githubUsername: string | null;
  totalFollowers: number;
  totalFollowing: number;
  isFollowing: boolean;
  isMe: boolean;
  createdAt: string;
  updatedAt: string;
}
