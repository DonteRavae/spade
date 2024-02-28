// EXTERNAL
import { RowDataPacket } from "mysql2";

// ENUMS

export enum SortBy {
  Latest = "Latest to Oldest",
  Oldest = "Oldest to Latest",
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
  commentsCount: number;
  favoritesCount?: number;
  votes: number;
  category: string;
  submittedBy: string | UserProfile;
  createdAt: string;
};

export type ForumComment = {
  id: string;
  content: string;
  votes: number;
  submittedBy: string | UserProfile;
  parentId: string;
  createdAt: string;
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

export type RequestSubmissionResponse = {
  success: boolean;
};

export type DatabaseInsertionResponse = {
  action: string;
  success: boolean;
  message?: string;
};

export type PodcastData = {
  id: number;
  title: string;
  audio_url: string;
  artwork_url: string;
  description: string;
  summary: string;
  artist: string;
  tags: string;
  published_at: string;
  duration: number;
  hq: boolean;
  magic_mastering: boolean;
  guid: string;
  inactive_at: null;
  custom_url: string;
  episode_number: number;
  season_number: number;
  episode_type: string;
  explicit: boolean;
  private: boolean;
  total_plays: number;
  createdAt: string;
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
  commentsCount: number;
  favoritesCount?: number;
  category: string;
  votes: number;
  createdAt: string;
  submittedBy: string;
}

export interface IForumComment extends RowDataPacket {
  id: string;
  content: string;
  votes: number;
  submittedBy: string;
  parentId: string;
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
