// INTERNAL
import pool from "../mysql.config";

// STATEMENTS
const CREATE_GUEST_REQUEST =
  "INSERT INTO guest_requests (name, occupation, contact_info) VALUES (?, ?, ?)";

const CREATE_TOPIC_REQUEST = "INSERT INTO topic_requests (topic) VALUES (?)";

export const requestGuest = async (
  name: string,
  occupation: string,
  contactInfo: string
) => {
  try {
    await pool.execute(CREATE_GUEST_REQUEST, [name, occupation, contactInfo]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const requestTopic = async (topic: string) => {
  try {
    await pool.execute(CREATE_TOPIC_REQUEST, [topic]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
