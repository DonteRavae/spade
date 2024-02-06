// REMIX
import { redirect } from "@remix-run/node";
// INTERNAL
import * as db from "./db.server";
import { Favorite, ForumPost, UserProfile, Vote } from "./types.server";
// EXTERNAL
import { ulid } from "ulid";
import { ValidSessionResponse, isSessionValid } from "../auth/auth.server";

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

export const getRecentPosts = async (limit: number) => {
  const posts = await db.getRecentPosts(limit);
  return posts as ForumPost[];
};

export const createPost = async (formData: FormData) => {
  const id = ulid();
  const title = formData.get("post-title") as string;
  const content = formData.get("post-content") as string;
  const contentType = "text";
  const category = formData.get("category") as string;
  const submittedBy = formData.get("submitted-by") as string;

  const { success } = await db.createPost({
    id,
    title,
    content,
    contentType,
    category,
    submittedBy,
    votes: 0,
    comments: 0,
  });

  return success
    ? redirect(`/community/users/${submittedBy}/posts/${id}`)
    : { success };
};

export const addComment = async (formData: FormData) => {
  const id = ulid();
  const content = formData.get("content") as string;
  const contentType = "text";
  const parentPostId = formData.get("parentPostId") as string;
  const parentCommentId =
    (formData.get("parentCommentId") as string) || undefined;
  const submittedBy = formData.get("submittedBy") as string;
  return await db.createPostComment({
    id,
    content,
    contentType,
    parentPostId,
    parentCommentId,
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
