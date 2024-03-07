import {
  DatabaseInsertionResponse,
  FetchRequestResponse,
  PodcastData,
  PodcastEpisodeDiscussionData,
} from "../lib/types";
import {
  fetchPodcastEpisodesWithComments,
  requestGuest,
  requestTopic,
} from "../db/podcast/db.server";
import { EMAIL_VALIDATION, URL_VALIDATION } from "~/utils/lib/helpers";

/* ---------- PODCAST IDENTIFICATION ---------- */
const PODCAST_API_KEY = process.env.BUZZSPROUT_API_KEY;
const PODCAST_ID = 1203632;
/* ---------- CACHED PODCAST DATA ---------- */
let podcastCatalog: PodcastData[] = [];
let lastModified = "";
let lastEtag = "";

export const getAllPodcasts = async (): Promise<
  FetchRequestResponse<PodcastData>
> =>
  await fetch(`https://www.buzzsprout.com/api/${PODCAST_ID}/episodes.json`, {
    headers: {
      Authorization: `Token token=${PODCAST_API_KEY}`,
      "If-None-Match": lastEtag,
      "If-Modified-Since": lastModified,
    },
  })
    .then(async (res) => {
      lastModified = res.headers.get("last-modified") || "";
      lastEtag = res.headers.get("etag") || "";

      if (res.status === 304) {
        return {
          success: true,
          payload: podcastCatalog,
        };
      }

      // podcastCatalog is assigned here instead of directly returned in case future response status codes are 304
      podcastCatalog = ((await res.json()) as PodcastData[])
        .filter((ep) => !ep.private)
        .map((pod) => ({ ...pod, createdAt: pod.published_at }));
      return {
        success: true,
        payload: podcastCatalog,
      };
    })
    .catch((error) => {
      console.error(error);
      return {
        success: false,
        message: "Error retrieving podcast episodes",
        payload: [],
      };
    });

export const getPodcastEpisodeById = async (
  id: number
): Promise<FetchRequestResponse<PodcastData>> => {
  if (!podcastCatalog.length) {
    const podcasts = await getAllPodcasts();
    if (podcasts.success) {
      const episode = podcasts.payload.find((ep) => ep.id === id);
      return episode
        ? {
            success: true,
            payload: [episode],
          }
        : {
            success: false,
            message: podcasts.message,
            payload: [],
          };
    } else
      return {
        success: false,
        message: podcasts.message,
        payload: [],
      };
  }

  const episode = podcastCatalog.find((ep) => ep.id === id);
  return episode
    ? {
        success: true,
        payload: [episode],
      }
    : {
        success: false,
        message: "Unable to find podcast episode with given podcast ID",
        payload: [],
      };
};

export const getPodcastEpisodesWithComments = async (): Promise<
  FetchRequestResponse<PodcastEpisodeDiscussionData>
> => {
  const { success, message, payload } =
    await fetchPodcastEpisodesWithComments();
  return success
    ? {
        success,
        message,
        payload: payload as PodcastEpisodeDiscussionData[],
      }
    : {
        success,
        message,
        payload,
      };
};

export const createGuestRequest = async (
  formData: FormData
): Promise<DatabaseInsertionResponse> => {
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

export const createTopicRequest = async (
  formData: FormData
): Promise<DatabaseInsertionResponse> => {
  const topic = formData.get("topic") as string;

  if (!topic)
    return {
      action: "topic-request",
      success: false,
      message: "Please enter a valid topic request.",
    };

  return await requestTopic(topic);
};
