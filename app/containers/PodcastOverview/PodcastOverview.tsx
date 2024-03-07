/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// REACT
import { useEffect, useRef, useState } from "react";
// REMIX
import { useFetcher, useNavigate } from "@remix-run/react";
// INTERNAL
import { action } from "~/root";
import { useApp } from "~/providers/AppProvider";
import podcastPlaylist from "~/utils/db/podcast/playlist.json";
import { ToastStatus } from "../../components/ToastStack/ToastStack";
// EXTERNAL
import { SpinnerCircular } from "spinners-react";
// STYLES
import styles from "./PodcastOverview.module.css";

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
  currentlyPlaying: boolean;
  handleClick: () => void;
}) => (
  <li
    className={`${styles["podcast-playlist-item"]} ${
      currentlyPlaying ? styles.playing : ""
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
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const guestRequestFormRef = useRef<HTMLFormElement>(null);
  const topicRequestFormRef = useRef<HTMLFormElement>(null);
  const { Form, data, state, formData } = useFetcher<typeof action>();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string>(
    podcastPlaylist[0].fileUrl
  );

  // Checks for pending UI state on form submission
  const isGuestRequestSubmitting =
    state === "submitting" && formData?.get("request-type") === "guest-request";
  const isTopicRequestSubmitting =
    state === "submitting" && formData?.get("request-type") === "topic-request";

  useEffect(() => {
    videoRef.current!.src = currentlyPlaying;
  }, [currentlyPlaying]);

  // Processes form submission responses and renders a Toast
  useEffect(() => {
    if (data?.action === "guest-request" && data.success) {
      addToast(ToastStatus.Success, "Thanks for your guest request!");
      guestRequestFormRef.current?.reset();
    } else if (data?.action === "guest-request" && !data.success) {
      addToast(ToastStatus.Error, data.message!);
    } else if (data?.action === "topic-request" && data.success) {
      addToast(ToastStatus.Success, "Thanks for your topic request!");
      topicRequestFormRef.current?.reset();
    } else if (data?.action === "topic-request" && !data.success) {
      addToast(ToastStatus.Error, data.message!);
    }
  }, [addToast, data?.action, data?.message, data?.success]);

  const advancePlaylist = () => {
    const currentVideoIndex = podcastPlaylist.findIndex(
      (pod) => pod.fileUrl === currentlyPlaying
    );

    if (currentVideoIndex <= podcastPlaylist.length - 2) {
      setCurrentlyPlaying(podcastPlaylist[currentVideoIndex + 1].fileUrl);
    } else {
      setCurrentlyPlaying(podcastPlaylist[0].fileUrl);
    }
  };

  const handleClick = (podUrl: string, podTitle: string) => {
    if (currentlyPlaying === podUrl) {
      navigate(`/podcast/ep/${podTitle}`.toLowerCase().replace(/\s/g, "-"));
    }

    setCurrentlyPlaying(podUrl);
    videoRef.current!.src = podUrl;
  };

  return (
    <section id={styles["podcast-overview"]}>
      <h1 className={styles["section-title"]}>Podcast</h1>
      <video autoPlay muted controls ref={videoRef} onEnded={advancePlaylist}>
        <source src={currentlyPlaying} type="video/mp4" />
      </video>
      <ul id={styles["podcast-playlist"]}>
        {podcastPlaylist.map((pod) => (
          <PodcastPlaylistItem
            key={pod.title}
            podcast={pod}
            currentlyPlaying={currentlyPlaying === pod.fileUrl}
            handleClick={() => handleClick(pod.fileUrl, pod.title)}
          />
        ))}
      </ul>
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
