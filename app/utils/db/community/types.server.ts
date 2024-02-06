// EXTERNAL
import { RowDataPacket } from "mysql2";

// ENUMS

export enum Flair {
  SUICIDE = "suicide",
  PTSD = "ptsd",
  ANXIETY = "anxiety",
  DEPRESSION = "depression",
  EPILEPSY = "epilepsy",
}

// TYPES

export type UserProfile = {
  id: string;
  username: string;
  avatarUrl: string;
};

export type ForumPost = {
  id: string;
  title: string;
  content: string;
  contentType: string;
  comments: number;
  votes: number;
  category: string;
  submittedBy: string | UserProfile;
  createdAt?: string;
};

export type ForumComment = {
  id: string;
  content: string;
  contentType: string;
  votes: number;
  submittedBy: string;
  parentPostId: string;
  parentCommentId?: string;
  createdAt?: string;
  lastModified?: string;
};

export type Vote = {
  id: string;
  parentId: string;
  vote: number;
  voter: string;
};

export type VoteUpdate = {
  voteId: string;
  vote: number;
};

export type Favorite = {
  parentId: string;
  userId: string;
};

// DATABASE INTERFACES

export interface ICommunityProfile extends RowDataPacket {
  id: string;
  username: string;
  avatarUrl: string;
}

export interface IPost extends RowDataPacket {
  id: string;
  title: string;
  content: string;
  contentType: string;
  comments: number;
  category: string;
  votes: number;
  createdAt: string;
  submittedBy: string;
}

export interface IForumComment extends RowDataPacket {
  id: string;
  content: string;
  contentType: string;
  votes: number;
  submittedBy: string;
  parentPostId: string;
  parentCommentId: string;
  createdAt: string;
  lastModified: string;
}

export interface IVote extends RowDataPacket {
  id: string;
  parentId: string;
  vote: number;
  voter: string;
}

export interface IFavorite extends RowDataPacket {
  parentId: string;
  userId: string;
}
