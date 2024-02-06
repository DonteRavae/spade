import { requestGuest, requestTopic } from "./db.server";

export const createGuestRequest = async (formData: FormData) => {
  const guestName = formData.get("guestName") as string;
  const guestOccupation = formData.get("guestOccupation") as string;
  const guestContact = formData.get("guestContact") as string;

  return await requestGuest(guestName, guestOccupation, guestContact);
};

export const createTopicRequest = async (formData: FormData) => {
  const topic = formData.get("topic") as string;

  return await requestTopic(topic);
};
