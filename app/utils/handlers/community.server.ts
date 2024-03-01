// REMIX
import { redirect } from "@remix-run/node";
// INTERNAL
import * as db from "../db/community/db.server";
import {
  Favorite,
  ForumComment,
  ForumPost,
  UserProfile,
  Vote,
} from "../lib/types";
import { ValidSessionResponse, isSessionValid } from "../db/auth/auth.server";
// EXTERNAL
import { ulid } from "ulid";

export const createCommunityProfile = async (
  userId: string,
  username: string,
  avatarUrl: string
) => {
  return await db.createProfile(userId, username, avatarUrl);
};

export const getCommunityProfile = async (
  request: Request,
  redirectTo: string
) => {
  const { decodedClaims, success } = (await isSessionValid(
    request,
    redirectTo
  )) as ValidSessionResponse;
  return success
    ? ((await db.getProfileById(decodedClaims!.uid)) as UserProfile)
    : null;
};

export const getCommunityProfileByUsername = async (username: string) => {
  return (await db.getProfileByUsername(username)) as UserProfile;
};

export const getPostById = async (postId: string) => {
  return (await db.getPostById(postId)) as ForumPost;
};

export const getCommentsByPostId = async (postId: string) => {
  return (await db.getCommentsByPostId(postId)) as ForumComment[];
};

export const getRecentPosts = async (limit: number) => {
  return (await db.getRecentPosts(limit)) as ForumPost[];
};

export const createPost = async (formData: FormData) => {
  const id = ulid();
  const title = formData.get("post-title") as string;
  const content = formData.get("post-content") as string;
  const contentType = "text";
  const category = formData.get("category") as string;
  const submittedBy = formData.get("submitted-by") as string;

  const response = await db.createPost({
    id,
    title,
    content,
    contentType,
    category,
    submittedBy,
    votes: 0,
    commentsCount: 0,
  });

  return response.success
    ? redirect(`/community/users/${submittedBy}/posts/${id}`)
    : response;
};

export const addComment = async (formData: FormData) => {
  const id = ulid();
  const content = formData.get("content") as string;
  const parentId = formData.get("parentId") as string;
  const submittedBy = formData.get("submittedBy") as string;

  if (!submittedBy.length)
    return {
      action: "add-comment",
      success: false,
      message: "User must be signed in to comment.",
    };

  return await db.createPostComment({
    id,
    content,
    parentId,
    submittedBy,
    votes: 0,
  });
};

export const placeVote = async (formData: FormData) => {
  const id = ulid();
  const parentId = formData.get("parentId") as string;
  const vote = Number(formData.get("vote") as string);
  const voter = formData.get("voter") as string;
  return await db.placeVote({ id, parentId, vote, voter });
};

export const updateVote = async (formData: FormData) => {
  const voteId = formData.get("voteId") as string;
  const vote = Number(formData.get("vote") as string);
  return await db.updateVote({ voteId, vote });
};

export const getVotesByUser = async (userId: string) => {
  return (await db.getVotesByUser(userId)) as Vote[];
};

export const getFavoritesByUser = async (userId: string) => {
  return (await db.getFavoritesByUser(userId)) as Favorite[];
};

export const addToFavorites = async (formData: FormData) => {
  const parentId = formData.get("parentId") as string;
  const userId = formData.get("userId") as string;
  return await db.addFavorite(parentId, userId);
};

export const removeFromFavorites = async (formData: FormData) => {
  const parentId = formData.get("parentId") as string;
  const userId = formData.get("userId") as string;
  return await db.removeFavorite(parentId, userId);
};
