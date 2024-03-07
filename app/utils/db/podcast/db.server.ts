// INTERNAL
import pool from "../mysql.config";
import {
  DatabaseInsertionResponse,
  FetchRequestResponse,
  IPodcastEpisodeDiscussionData,
} from "~/utils/lib/types";

/* ---------- STATEMENTS ---------- */
const CREATE_GUEST_REQUEST =
  "INSERT INTO guest_requests (name, occupation, contact_info) VALUES (?, ?, ?)";

const CREATE_TOPIC_REQUEST = "INSERT INTO topic_requests (topic) VALUES (?)";

const FETCH_EPISODES_WITH_COMMENTS = `
  SELECT
    ep.id,
    ep.title,
    ep.artwork_url AS artworkUrl,
    ep.artist,
    ep.season_number AS seasonNumber,
    ep.episode_number AS episodeNumber,
    COUNT(c.id) AS commentsTotal,
    COUNT(f.parent_id) AS likesTotal,
    (
      SELECT
        JSON_OBJECT('id', id, 'content', content, 'lastUpdate', last_update)
      FROM comments
      WHERE parent_id = ep.id
      ORDER BY last_update
      DESC
      LIMIT 1
    ) AS latestComment
  FROM podcast_episodes AS ep
  LEFT JOIN comments AS c
  ON c.parent_id = ep.id
  LEFT JOIN favorites AS f
  ON f.parent_id = ep.id
  GROUP BY ep.id
  HAVING commentsTotal > 0
`;

/* ---------- HANDLERS ---------- */

export const requestGuest = async (
  name: string,
  occupation: string,
  contactInfo: string
): Promise<DatabaseInsertionResponse> => {
  try {
    await pool.execute(CREATE_GUEST_REQUEST, [name, occupation, contactInfo]);
    return { action: "guest-request", success: true };
  } catch (error) {
    console.error(error);
    return { action: "guest-request", success: false };
  }
};

export const requestTopic = async (
  topic: string
): Promise<DatabaseInsertionResponse> => {
  try {
    await pool.execute(CREATE_TOPIC_REQUEST, [topic]);
    return { action: "topic-request", success: true };
  } catch (error) {
    console.error(error);
    return { action: "topic-request", success: false };
  }
};

export const fetchPodcastEpisodesWithComments = async (): Promise<
  FetchRequestResponse<IPodcastEpisodeDiscussionData>
> => {
  try {
    const [data] = await pool.execute<IPodcastEpisodeDiscussionData[]>(
      FETCH_EPISODES_WITH_COMMENTS
    );

    return {
      success: true,
      payload: data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error fetching data from database. Please try again.",
      payload: [],
    };
  }
};
