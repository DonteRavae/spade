import { requestGuest, requestTopic } from "../db/podcast/db.server";
import { EMAIL_VALIDATION, URL_VALIDATION } from "~/utils/lib/helpers";
import { PodcastData } from "../lib/types";

/* ---------- PODCAST IDENTIFICATION ---------- */
const PODCAST_API_KEY = process.env.BUZZSPROUT_API_KEY;
const PODCAST_ID = 1203632;
/* ---------- CACHED PODCAST DATA ---------- */
let podcastCatalog: PodcastData[] = [];
let lastModified = "";
let lastEtag = "";

export const getPodcastEpisodeById = async (id: number) => {
  if (!podcastCatalog.length) {
    const podcasts = await getAllPodcasts();
    const episode = podcasts.find((ep) => (ep.id === id));
    return episode;
  }

  const episode = podcastCatalog.find((ep) => (ep.id === id));
  return episode;
};

export const getAllPodcasts = async () =>
  await fetch(`https://www.buzzsprout.com/api/${PODCAST_ID}/episodes.json`, {
    headers: {
      Authorization: `Token token=${PODCAST_API_KEY}`,
      "If-None-Match": lastEtag,
      "If-Modified-Since": lastModified,
    },
  }).then(async (res) => {
    lastModified = res.headers.get("last-modified") || "";
    lastEtag = res.headers.get("etag") || "";

    if (res.status === 304) {
      return podcastCatalog;
    }

    // podcastCatalog is assigned here instead of directly returned in case future response status codes are 304
    podcastCatalog = ((await res.json()) as PodcastData[])
      .filter((ep) => !ep.private)
      .map((pod) => ({ ...pod, createdAt: pod.published_at }));
    return podcastCatalog;
  });

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
