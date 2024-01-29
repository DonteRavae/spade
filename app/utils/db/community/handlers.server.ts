// REMIX
import { redirect } from "@remix-run/node";
// INTERNAL
import * as db from "./db.server";
// EXTERNAL
import { ulid } from "ulid";
import { ForumPost, UserProfile } from "./types.server";

export const createCommunityProfile = async (
  userId: string,
  username: string,
  avatarUrl: string
) => {
  return await db.createProfile(userId, username, avatarUrl);
};

export const getCommunityProfileById = async (userId: string) => {
  return (await db.getProfileById(userId)) as UserProfile;
};

export const getCommunityProfileByUsername = async (username: string) => {
  return (await db.getProfileByUsername(username)) as UserProfile;
};

export const createPost = async (formData: FormData) => {
  const id = ulid();
  const title = formData.get("post-title") as string;
  const content = formData.get("post-content") as string;
  const contentType = "text";
  const flair = formData.get("flair") as string;
  const submittedBy = formData.get("submitted-by") as string;

  const success = await db.createPost({
    id,
    title,
    content,
    contentType,
    flair,
    submittedBy,
  });

  if (!success) return;

  return redirect(`/community/users/${submittedBy}/posts/${id}`);
};

export const getRecentPosts = async (limit: number) => {
  const posts = await db.getRecentPosts(limit);
  return posts as ForumPost[];
};
