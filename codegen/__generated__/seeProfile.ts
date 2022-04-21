/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile {
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

export interface seeProfile {
  seeProfile: seeProfile_seeProfile | null;
}

export interface seeProfileVariables {
  username: string;
}
