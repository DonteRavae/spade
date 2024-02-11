// INTERNAL
import { DatabaseInsertionResponse } from "../helpers";
import pool from "../mysql.config";
import {
  ForumComment,
  ForumPost,
  ICommunityProfile,
  IFavorite,
  IForumComment,
  IPost,
  IVote,
  Vote,
  VoteUpdate,
} from "./types.server";

// DATABASE STATEMENTS

const CREATE_COMMUNITY_PROFILE = `
  INSERT INTO profiles (id, username, avatar_url)
  VALUES (?, ?, ?)
`;

const FETCH_PROFILE_BY_ID = `
  SELECT
    id,
    username,
    avatar_url AS avatarUrl
  FROM profiles
  WHERE id = ?
`;

const FETCH_PROFILE_BY_USERNAME = `
  SELECT
    id,
    username,
    avatar_url AS avatarUrl
  FROM profiles
  WHERE username = ?
`;

const CREATE_POST_STATEMENT = `
  INSERT INTO forum_posts (id, title, content, content_type, category, submitted_by)
  VALUES (?, ?, ?, ?, ?, ?)
`;

const FETCH_COMMENTS_BY_POST_ID = `
  SELECT
    c.id,
    c.content,
    c.parent_id AS parentId,
    c.created_at AS createdAt,
    (SELECT COALESCE(SUM(vote), 0) FROM votes WHERE parent_id = c.id) AS votes,
    JSON_OBJECT('userId', p.id, 'username', p.username, 'avatarUrl', p.avatar_url) AS submittedBy
  FROM comments AS c
  LEFT JOIN profiles AS p
    ON c.submitted_by = p.id
  WHERE c.parent_id = ?
`;

const FETCH_POST_BY_ID = `
  SELECT
    fp.id,
    fp.title,
    fp.content,
    fp.content_type AS contentType,
    fp.category,
    fp.created_at AS createdAt,
    JSON_OBJECT('userId', cp.id, 'username', cp.username, 'avatarUrl', cp.avatar_url) AS submittedBy,
    COUNT(c.id) as commentsCount,
    (SELECT COALESCE(SUM(vote), 0) FROM votes WHERE parent_id = ?) AS votes
  FROM forum_posts AS fp
  LEFT JOIN profiles AS cp
    ON fp.submitted_by = cp.username
  LEFT JOIN comments AS c
    ON c.parent_id = fp.id
  WHERE fp.id = ?
  GROUP BY fp.id`;

const FETCH_RECENT_POSTS = `
  SELECT
    fp.id,
    fp.title,
    fp.content,
    fp.content_type AS contentType,
    fp.category,
    fp.created_at AS createdAt,
    JSON_OBJECT('userId', cp.id, 'username', cp.username, 'avatarUrl', cp.avatar_url) AS submittedBy,
    (SELECT COALESCE(SUM(vote), 0) FROM votes WHERE parent_id = fp.id) AS votes,
    COUNT(c.id) as commentsCount
  FROM forum_posts AS fp
  JOIN profiles AS cp
    ON fp.submitted_by = cp.username
  LEFT JOIN comments AS c
    ON c.parent_id = fp.id
  WHERE fp.created_at > now() - interval 7 day
  GROUP BY fp.id
  ORDER BY fp.created_at
  DESC LIMIT ?`;

const CREATE_FORUM_COMMENT = `
  INSERT INTO comments (id, content, parent_id, submitted_by)
  VALUES (?, ?, ?, ?)
`;

const FETCH_VOTES_BY_USER = `
  SELECT
    id,
    parent_id AS parentId,
    vote,
    voter
  FROM votes
  WHERE voter = ?
`;

const CAST_VOTE = `
  INSERT INTO votes (id, parent_id, vote, voter)
  VALUES (?, ?, ?, ?)
`;

const UPDATE_VOTE = `
  UPDATE votes
  SET vote = ?
  WHERE id = ?
`;

const FETCH_FAVORITES_BY_USER = `
  SELECT
    parent_id AS parentId
  FROM favorites
  WHERE user_id = ?
`;

const ADD_TO_FAVORITES = `
  INSERT INTO favorites (parent_id, user_id)
  VALUES (?, ?)
`;

const REMOVE_FROM_FAVORITES = `
  DELETE FROM favorites
  WHERE parent_id = ? AND user_id = ?
`;

// DATABASE HANDLERS

export const createProfile = async (
  userId: string,
  username: string,
  avatarUrl: string
) => {
  try {
    await pool.execute(CREATE_COMMUNITY_PROFILE, [userId, username, avatarUrl]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const getProfileById = async (userId: string) => {
  try {
    const [results] = await pool.execute<ICommunityProfile[]>(
      FETCH_PROFILE_BY_ID,
      [userId]
    );
    return results.length ? results[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProfileByUsername = async (username: string) => {
  try {
    const [results] = await pool.execute<ICommunityProfile[]>(
      FETCH_PROFILE_BY_USERNAME,
      [username]
    );
    return results.length ? results[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createPost = async (
  post: ForumPost
): Promise<DatabaseInsertionResponse> => {
  const { id, title, content, contentType, category, submittedBy } = post;
  try {
    await pool.execute(CREATE_POST_STATEMENT, [
      id,
      title,
      content,
      contentType,
      category,
      submittedBy,
    ]);

    return { action: "create-post", success: true };
  } catch (error) {
    console.error(error);
    return { action: "create-post", success: false };
  }
};

export const getRecentPosts = async (limit: number = 20) => {
  try {
    const [results] = await pool.query<IPost[]>(FETCH_RECENT_POSTS, [limit]);
    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPostById = async (postId: string) => {
  try {
    const [results] = await pool.execute<IPost[]>(FETCH_POST_BY_ID, [
      postId,
      postId,
    ]);
    return results.length ? results[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCommentsByPostId = async (postId: string) => {
  const [results] = await pool.execute<IForumComment[]>(
    FETCH_COMMENTS_BY_POST_ID,
    [postId]
  );
  return results.length ? results : [];
};

export const createPostComment = async (
  comment: ForumComment
): Promise<DatabaseInsertionResponse> => {
  const { id, content, parentId, submittedBy } = comment;
  try {
    await pool.execute(CREATE_FORUM_COMMENT, [
      id,
      content,
      parentId,
      submittedBy,
    ]);
    return { action: "add-comment", success: true };
  } catch (error) {
    console.error(error);
    return { action: "add-comment", success: false };
  }
};

export const getVotesByUser = async (userId: string) => {
  try {
    const [results] = await pool.execute<IVote[]>(FETCH_VOTES_BY_USER, [
      userId,
    ]);
    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const placeVote = async (
  newVote: Vote
): Promise<DatabaseInsertionResponse> => {
  const { id, parentId, vote, voter } = newVote;

  try {
    await pool.execute(CAST_VOTE, [id, parentId, vote, voter]);
    return { action: "new-vote", success: true };
  } catch (error) {
    console.error(error);
    return { action: "new-vote", success: false };
  }
};

export const updateVote = async (
  updatedVote: VoteUpdate
): Promise<DatabaseInsertionResponse> => {
  const { voteId, vote } = updatedVote;

  try {
    await pool.execute(UPDATE_VOTE, [vote, voteId]);
    return { action: "update-vote", success: true };
  } catch (error) {
    console.error(error);
    return { action: "update-vote", success: false };
  }
};

export const getFavoritesByUser = async (userId: string) => {
  try {
    const [results] = await pool.execute<IFavorite[]>(FETCH_FAVORITES_BY_USER, [
      userId,
    ]);
    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addFavorite = async (
  parentId: string,
  userId: string
): Promise<DatabaseInsertionResponse> => {
  try {
    await pool.execute(ADD_TO_FAVORITES, [parentId, userId]);
    return { action: "add-favorite", success: true };
  } catch (error) {
    console.error(error);
    return { action: "add-favorite", success: false };
  }
};

export const removeFavorite = async (
  parentId: string,
  userId: string
): Promise<DatabaseInsertionResponse> => {
  try {
    await pool.execute(REMOVE_FROM_FAVORITES, [parentId, userId]);
    return { action: "remove-favorite", success: true };
  } catch (error) {
    console.error(error);
    return { action: "remove-favorite", success: false };
  }
};
