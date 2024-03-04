/* eslint-disable jsx-a11y/media-has-caption */
// REMIX
import { Link, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
// INTERNAL
import {
  convertEpisodeDurationToReadable,
  convertEpisodeReleaseDateToLocaleString,
} from "~/utils/lib/helpers";
import Icons from "~/components/Icons";
import YouTubeUrls from "~/utils/db/podcast/youtubeUrls";
import { parseRequests } from "~/utils/handlers/index.server";
import VideoPlayer from "~/components/VideoPlayer/VideoPlayer";
import CommentsTree from "~/containers/CommentsTree/CommentsTree";
import PageContainer from "~/containers/PageContainer/PageContainer";
import { getCommentsByPostId } from "~/utils/handlers/community.server";
import { getPodcastEpisodeById } from "~/utils/handlers/podcast.server";
import ShareController from "~/components/ShareController/ShareController";
import FavoriteController from "~/components/FavoriteController/FavoriteController";
// EXTERNAL
import invariant from "tiny-invariant";
// STYLES
import styles from "./styles/PodcastEpisode.module.css";

export const action = async ({ request }: ActionFunctionArgs) => {
  return await parseRequests(request);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.episodeId, "Missing episodeId param");
  const episodeId = Number(params.episodeId.split("-")[0]);
  const episode = await getPodcastEpisodeById(episodeId);
  const comments = await getCommentsByPostId(`${episodeId}`);

  if (!episode) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ episode, comments });
};

export default function PodcastEpisodePage() {
  const { episode, comments } = useLoaderData<typeof loader>();
  return (
    <PageContainer id={styles["podcast-episode-page"]}>
      <Link className={styles["return-home-link"]} to="/podcast">
        <Icons type="home" /> Podcast Home
      </Link>
      <h1 className={styles["episode-title"]}>{`#${
        episode.season_number * 100 + episode.episode_number
      } ${episode.title}`}</h1>
      <p className={styles["episode-host"]}>Hosted by {episode.artist}</p>
      <div className={styles["episode-metadata"]}>
        <p className={styles["episode-release-date"]}>
          {convertEpisodeReleaseDateToLocaleString(episode.published_at)}
        </p>
        <p className={styles["episode-duration"]}>
          {convertEpisodeDurationToReadable(episode.duration)}
        </p>
      </div>
      {YouTubeUrls[episode.id] ? (
        <VideoPlayer
          url={`https://www.youtube.com/watch?v=${YouTubeUrls[episode.id]}`}
        />
      ) : (
        <img
          className={styles["video-player-placeholder"]}
          src={episode.artwork_url}
          alt="Video Player Placeholder"
        />
      )}
      <div className={styles["controllers-and-externals"]}>
        <div className={styles.controllers}>
          <FavoriteController
            parentId={`${episode.id}`}
            direction="horizontal"
            noText
          />
          <ShareController direction="horizontal" noText />
        </div>
        <div className={styles["external-providers"]}>
          <p>Available to stream on</p>
          <Link to="https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy8yNTIzMjdhNC9wb2RjYXN0L3Jzcw==">
            <Icons type="brand-google-podcast" />
          </Link>
          <Link to="https://podcasts.apple.com/us/podcast/spade-the-podcast/id1519378871">
            <Icons type="brand-apple-podcast" />
          </Link>
          <Link to="https://open.spotify.com/show/3NpMM6NmYbFaWI1J0oyYK6">
            <Icons type="brand-spotify-podcast" />
          </Link>
        </div>
      </div>
      <h2>Episode Description</h2>
      <div
        className={styles["episode-description"]}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      ></div>
      <CommentsTree comments={comments} postId={`${episode.id}`} />
    </PageContainer>
  );
}
