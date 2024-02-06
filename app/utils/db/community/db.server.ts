// INTERNAL
import pool from "../mysql.config";
import {
  ForumComment,
  ForumPost,
  ICommunityProfile,
  IFavorite,
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

const FETCH_POST_BY_ID = `
  SELECT
    fp.id,
    fp.title,
    fp.content,
    fp.content_type AS contentType,
    fp.category,
    fp.created_at AS createdAt,
    JSON_OBJECT('userId', cp.id, 'username', cp.username, 'avatarUrl', cp.avatar_url) AS submittedBy,
    SUM(IFNULL(v.vote, 0)) AS votes,
    COUNT(c.id) as comments
  FROM forum_posts AS fp
  JOIN profiles AS cp
    ON fp.submitted_by = cp.username
  LEFT JOIN votes AS v
    ON v.parent_id = fp.id
  LEFT JOIN comments AS c
    ON c.parent_post_id = fp.id
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
    SUM(IFNULL(v.vote, 0)) AS votes,
    COUNT(c.id) as comments
  FROM forum_posts AS fp
  JOIN profiles AS cp
    ON fp.submitted_by = cp.username
  LEFT JOIN votes AS v
    ON v.parent_id = fp.id
  LEFT JOIN comments AS c
    ON c.parent_post_id = fp.id
  WHERE fp.created_at > now() - interval 7 day
  GROUP BY fp.id
  ORDER BY fp.created_at
  DESC LIMIT ?`;

const CREATE_FORUM_COMMENT = `
  INSERT INTO comments (id, content, content_type, parent_comment_id, parent_post_id, submitted_by)
  VALUES (?, ?, ?, ?, ?, ?)
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

export const createPost = async (post: ForumPost) => {
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

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
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
    const [results] = await pool.execute<IPost[]>(FETCH_POST_BY_ID, [postId]);
    return results.length ? results[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createPostComment = async (comment: ForumComment) => {
  try {
    await pool.execute(CREATE_FORUM_COMMENT, [comment]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
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

export const placeVote = async (newVote: Vote) => {
  const { id, parentId, vote, voter } = newVote;

  try {
    await pool.execute(CAST_VOTE, [id, parentId, vote, voter]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const updateVote = async (updatedVote: VoteUpdate) => {
  const { voteId, vote } = updatedVote;

  try {
    await pool.execute(UPDATE_VOTE, [vote, voteId]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
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

export const addFavorite = async (parentId: string, userId: string) => {
  try {
    await pool.execute(ADD_TO_FAVORITES, [parentId, userId]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const removeFavorite = async (parentId: string, userId: string) => {
  try {
    await pool.execute(REMOVE_FROM_FAVORITES, [parentId, userId]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
