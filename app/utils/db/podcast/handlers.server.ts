import { requestGuest, requestTopic } from "./db.server";
import { EMAIL_VALIDATION, URL_VALIDATION } from "../helpers";

export const createGuestRequest = async (formData: FormData) => {
  const guestName = formData.get("guestName") as string;
  const guestOccupation = formData.get("guestOccupation") as string;
  const guestContact = formData.get("guestContact") as string;

  if (!guestName)
    return {
      action: "guest-request",
      success: false,
      message: "Please enter a valid guest name.",
    };

  if (
    !guestContact ||
    !EMAIL_VALIDATION.test(guestContact) ||
    !URL_VALIDATION.test(guestContact)
  )
    return {
      action: "guest-request",
      success: false,
      message: "Please enter a valid guest contact.",
    };

  return await requestGuest(guestName, guestOccupation, guestContact);
};

export const createTopicRequest = async (formData: FormData) => {
  const topic = formData.get("topic") as string;

  if (!topic)
    return {
      action: "topic-request",
      success: false,
      message: "Please enter a valid topic request.",
    };

  return await requestTopic(topic);
};
