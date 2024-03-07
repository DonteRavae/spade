// REMIX
import { Link, useLoaderData } from "@remix-run/react";
// STYLES
import styles from "./styles/PodcastDiscussions.module.css";
import { getPodcastEpisodesWithComments } from "~/utils/handlers/podcast.server";
import { PodcastEpisodeDiscussionData } from "~/utils/lib/types";
import Icons from "~/components/Icons";
import {
  findTimeSinceCreated,
  formatEpisodeLinkHref,
  formatEpisodeTitle,
} from "~/utils/lib/helpers";

export const loader = async () => {
  // Get all episodes where comments count is greater than 0.
  const { success, payload } = await getPodcastEpisodesWithComments();
  return { episodes: success ? payload : [] };
};

const PodcastEpisodeDiscussionCard = ({
  episode,
}: {
  episode: PodcastEpisodeDiscussionData;
}) => (
  <li className={styles["podcast-discussion-card"]}>
    <Link to={formatEpisodeLinkHref(episode.id, episode.title, true)}>
      <div className={styles["card-header"]}>
        <img src={episode.artworkUrl} alt="Podcast Episode Season Cover Art" />
        <h3>
          {formatEpisodeTitle(
            episode.seasonNumber,
            episode.episodeNumber,
            episode.title
          )}
        </h3>
        <div className={styles["likes-and-comments-count"]}>
          <Icons type="empty-heart" /> {episode.likesTotal}
          <span className={styles.divider} />
          <Icons type="comment" /> {episode.commentsTotal}
        </div>
        <p className={styles["last-update"]}>
          <strong>Last Interaction:</strong>{" "}
          {findTimeSinceCreated(episode.latestComment.lastUpdate)}
        </p>
      </div>
      <p>{`"${episode.latestComment.content}"`}</p>
    </Link>
  </li>
);

export default function PodcastDiscussionsPage() {
  const { episodes } = useLoaderData<typeof loader>();
  return (
    <section id={styles["podcast-discussions-page"]}>
      <h1>
        {"The conversation doesn't have to end because the episode is over"}
      </h1>
      <h2>Jump into a discussion below and let us know your thoughts.</h2>
      <ul id={styles["discussion-grid"]}>
        {episodes.map((ep) => (
          <PodcastEpisodeDiscussionCard key={ep.id} episode={ep} />
        ))}
      </ul>
    </section>
  );
}
