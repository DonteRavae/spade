import { PodcastData } from "./types.server";

export const EMAIL_VALIDATION = /^(\w+@[a-zA-Z_]+?\.[a-zA-Z.]{2,6})$/;
export const PWD_VALIDATION =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const URL_VALIDATION =
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/;

export const findTimeSinceCreated = (timestamp: string): string => {
  const timeCreated = Date.parse(timestamp);
  const now = Date.now();

  const timeDiff = Math.floor((now - timeCreated) / 60000); // In minutes
  const oneDay = 60 * 24;
  const oneHour = 60;

  if (timeDiff >= oneDay) return `${Math.floor(timeDiff / oneDay)}d ago`;
  else if (timeDiff >= oneHour) return `${Math.floor(timeDiff / oneHour)}h ago`;
  else if (timeDiff >= 1) return `${Math.floor(timeDiff)}m ago`;

  return "moments ago";
};

export const convertEpisodeDurationToReadable = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const hours = Math.floor(minutes / 60);

  return minutes >= 60 ? `${hours} hr ${minutes % 60} min` : `${minutes} min`;
};
export const convertEpisodeReleaseDateToLocaleString = (
  releaseDate: string
) => {
  return new Date(releaseDate).toLocaleDateString("en-US");
};
export const filterPodcastCatalogBySeason = (
  catalog: PodcastData[],
  season: number
): PodcastData[] => {
  return catalog.filter((ep) => ep.season_number === season);
};
