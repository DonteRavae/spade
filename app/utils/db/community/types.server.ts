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
  votes?: number;
  flair: string;
  submittedBy: string | UserProfile;
  createdAt?: string;
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
  flair: string;
  votes: number;
  createdAt: string;
  submittedBy: string;
}
