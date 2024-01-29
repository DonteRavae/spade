// INTERNAL
import { ForumPost, ICommunityProfile, IPost } from "./types.server";
// EXTERNAL
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 20,
  waitForConnections: true,
});

export default pool;

// DATABASE STATEMENTS

const CREATE_COMMUNITY_PROFILE =
  "INSERT INTO profiles (id, username, avatar_url) VALUES (?, ?, ?)";

const FETCH_PROFILE_BY_ID =
  "SELECT id, username, avatar_url AS avatarUrl FROM profiles WHERE id = ?";

const FETCH_PROFILE_BY_USERNAME =
  "SELECT id, username, avatar_url AS avatarUrl FROM profiles WHERE username = ?";

const CREATE_POST_STATEMENT =
  "INSERT INTO forum_posts (id, title, content, content_type, flair, submitted_by) VALUES (?, ?, ?, ?, ?, ?)";

const FETCH_RECENT_POSTS =
  "SELECT fp.id, fp.title, fp.content, fp.content_type AS contentType, fp.flair, fp.votes, fp.created_at AS createdAt, JSON_OBJECT('userId', cp.id, 'username', cp.username, 'avatarUrl', cp.avatar_url) AS submittedBy FROM forum_posts AS fp JOIN profiles AS cp ON fp.submitted_by = cp.username WHERE created_at > now() - interval 2 day ORDER BY created_at DESC LIMIT ?";
// DATABASE HANDLERS

export const createProfile = async (
  userId: string,
  username: string,
  avatarUrl: string
) => {
  try {
    await pool.execute(CREATE_COMMUNITY_PROFILE, [userId, username, avatarUrl]);
  } catch (error) {
    console.error(error);
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
  }
};

export const createPost = async (post: ForumPost) => {
  const { id, title, content, contentType, flair, submittedBy } = post;
  try {
    await pool.execute(CREATE_POST_STATEMENT, [
      id,
      title,
      content,
      contentType,
      flair,
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
    return results.length ? results : null;
  } catch (error) {
    console.error(error);
  }
};