// INTERNAL
import * as podcastHandlers from "./db/podcast/handlers.server";
import * as communityHandlers from "./db/community/handlers.server";

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
  const requestType = formData.get("request-type") as string;
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
