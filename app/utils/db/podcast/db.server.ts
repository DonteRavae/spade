// INTERNAL
import pool from "../mysql.config";
import { DatabaseInsertionResponse } from "~/utils/lib/types.server";

// STATEMENTS
const CREATE_GUEST_REQUEST =
  "INSERT INTO guest_requests (name, occupation, contact_info) VALUES (?, ?, ?)";

const CREATE_TOPIC_REQUEST = "INSERT INTO topic_requests (topic) VALUES (?)";

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
