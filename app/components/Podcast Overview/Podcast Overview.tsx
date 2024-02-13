/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// REACT
import { useEffect, useRef, useState } from "react";
// REMIX
import { useFetcher } from "@remix-run/react";
// INTERNAL
import { action } from "~/root";
import { useApp } from "~/providers/AppProvider";
import { ToastStatus } from "../ToastStack/ToastStack";
import podcastPlaylist from "~/utils/db/podcast/playlist.json";
// EXTERNAL
import { SpinnerCircular } from "spinners-react";
// STYLES
import styles from "./Podcast Overview.module.css";

type PodcastPlaylistData = {
  title: string;
  host: string;
  guests: string[];
  releaseDate: string;
  fileUrl: string;
};

const PodcastPlaylistItem = ({
  podcast,
  currentlyPlaying,
  handleClick,
}: {
  podcast: PodcastPlaylistData;
  currentlyPlaying: string;
  handleClick: () => void;
}) => (
  <li
    className={`${styles["podcast-playlist-item"]} ${
      currentlyPlaying === podcast.fileUrl ? styles.playing : ""
    }`}
    onClick={handleClick}
    onKeyDown={handleClick}
    aria-label="Play podcast preview"
  >
    <div className={`${styles["content-container"]}`}>
      <p>
        <strong>{podcast.title}</strong>
      </p>
      <span />
      <p>
        <strong>Host</strong>: {podcast.host}
      </p>
      <span />
      <p>
        <strong>Guests</strong>: {podcast.guests.join(", ")}
      </p>
    </div>
  </li>
);

export default function PodcastOverview() {
  const { addToast } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const guestRequestFormRef = useRef<HTMLFormElement>(null);
  const topicRequestFormRef = useRef<HTMLFormElement>(null);
  const { Form, data, state, formData } = useFetcher<typeof action>();
  const [loadedPodcastUrl, setLoadedPodcastUrl] = useState<string>(
    podcastPlaylist[0].fileUrl
  );

  // Checks for pending UI state on form submission
  const isGuestRequestSubmitting =
    state === "submitting" && formData?.get("request-type") === "guest-request";
  const isTopicRequestSubmitting =
    state === "submitting" && formData?.get("request-type") === "topic-request";

  // Loads the next video in the playlist playlist once current video ends
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentVideoIndex = podcastPlaylist.findIndex(
        (pod) => pod.fileUrl === loadedPodcastUrl
      );
      currentVideoIndex <= podcastPlaylist.length - 2
        ? setLoadedPodcastUrl(podcastPlaylist[currentVideoIndex + 1].fileUrl)
        : setLoadedPodcastUrl(podcastPlaylist[0].fileUrl);
    }, videoRef.current!.duration * 1000);

    return () => clearInterval(timer);
  }, [loadedPodcastUrl]);

  // Sets video src to loaded video url
  useEffect(() => {
    videoRef.current!.src = loadedPodcastUrl;
  }, [loadedPodcastUrl]);

  // Processes form submission responses and renders a Toast
  useEffect(() => {
    if (data?.action === "guest-request" && data.success) {
      addToast(ToastStatus.Success, "Thanks for your guest request!");
      guestRequestFormRef.current?.reset();
    } else if (data?.action === "guest-request" && !data.success) {
      addToast(ToastStatus.Error, "");
    } else if (data?.action === "topic-request" && data.success) {
      addToast(ToastStatus.Success, "Thanks for your topic request!");
      topicRequestFormRef.current?.reset();
    } else if (data?.action === "topic-request" && !data.success) {
      addToast(ToastStatus.Error, "");
    }
  }, [addToast, data?.action, data?.success]);

  return (
    <section id={styles["podcast-overview"]}>
      <h1 className={styles["section-title"]}>Podcast</h1>
      <video autoPlay muted controls ref={videoRef}>
        <source src={loadedPodcastUrl} type="video/mp4" />
      </video>
      <ul id={styles["podcast-playlist"]}>
        {podcastPlaylist.map((pod) => (
          <PodcastPlaylistItem
            key={pod.title}
            podcast={pod}
            currentlyPlaying={loadedPodcastUrl}
            handleClick={() => setLoadedPodcastUrl(pod.fileUrl)}
          />
        ))}
      </ul>
      <div className={styles["upcoming-podcast"]}>
        <p>
          <strong>Upcoming Guest </strong>: Someone
        </p>
        <p>
          <strong>Upcoming Podcast Release</strong>: Some Date
        </p>
      </div>
      <Form method="post" ref={guestRequestFormRef}>
        <h3>
          Who would you like to hear from next? Drop their details below so that
          we can reach out!
        </h3>
        <div>
          <label htmlFor={styles["guest-name"]}>Name:</label>
          <input
            type="text"
            name="guestName"
            id={styles["guest-name"]}
            required
          />
        </div>
        <div>
          <label htmlFor={styles["guest-occupation"]}>Occupation:</label>
          <input
            type="text"
            name="guestOccupation"
            id={styles["guest-occupation"]}
          />
        </div>
        <div>
          <label htmlFor={styles["guest-contact"]}>
            Contact (e-mail or website):
          </label>
          <input
            type="text"
            name="guestContact"
            id={styles["guest-contact"]}
            required
          />
        </div>
        <input name="request-type" value="guest-request" hidden />
        <button
          type="submit"
          className={styles["podcast-overview-submission-btn"]}
        >
          {isGuestRequestSubmitting ? (
            <SpinnerCircular size={30} color="white" />
          ) : (
            "Submit"
          )}
        </button>
      </Form>
      <Form method="post" ref={topicRequestFormRef}>
        <h3 id={styles["topic-recommendation"]}>
          Got a topic you think we should cover? Tell us below!
        </h3>
        <textarea
          name="topic"
          placeholder="What should we talk about?"
          required
        />
        <input name="request-type" value="topic-request" hidden />
        <button
          type="submit"
          className={styles["podcast-overview-submission-btn"]}
        >
          {isTopicRequestSubmitting ? (
            <SpinnerCircular size={30} color="white" />
          ) : (
            "Submit"
          )}
        </button>
      </Form>
    </section>
  );
}
