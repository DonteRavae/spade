import * as podcastHandlers from "./podcast.server";
import * as communityHandlers from "./community.server";

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
