// INTERNAL
import * as podcastHandlers from "../db/podcast/handlers.server";
import * as communityHandlers from "../db/community/handlers.server";

export const EMAIL_VALIDATION = /^(\w+@[a-zA-Z_]+?\.[a-zA-Z.]{2,6})$/;
export const PWD_VALIDATION =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const URL_VALIDATION =
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/;

export type DatabaseInsertionResponse = {
  action: string;
  success: boolean;
  message?: string;
};

export const findTimeSinceCreated = (timestamp: string): string => {
  const timeCreated = Date.parse(timestamp);
  const now = Date.now();

  const timeDiff = Math.floor((now - timeCreated) / 60000);
  const oneDay = 60 * 24;
  const oneHour = 60;

  if (timeDiff > oneDay) return `${Math.floor(timeDiff / oneDay)}d ago`;
  else if (timeDiff > oneHour) return `${Math.floor(timeDiff / oneHour)}h ago`;
  else if (timeDiff > 1) return `${Math.floor(timeDiff)}m ago`;

  return "moments ago";
};

export const parseRequests = async (request: Request) => {
  const formData = await request.formData();
  const requestType = String(formData.get("request-type"));
  try {
    switch (requestType) {
      case "create-post":
        return await communityHandlers.createPost(formData);
      case "new-vote":
        console.log("new vote request hit");
        return await communityHandlers.placeVote(formData);
      case "update-vote":
        return await communityHandlers.updateVote(formData);
      case "add-favorite":
        return await communityHandlers.addToFavorites(formData);
      case "remove-favorite":
        return await communityHandlers.removeFromFavorites(formData);
      case "add-comment":
        console.log("add comment hit");
        return await communityHandlers.addComment(formData);
      case "guest-request":
        return await podcastHandlers.createGuestRequest(formData);
      case "topic-request":
        return await podcastHandlers.createTopicRequest(formData);
      default:
        return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
