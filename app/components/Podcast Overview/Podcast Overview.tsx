// REACT
import { useEffect, useRef } from "react";
// REMIX
import { useFetcher } from "@remix-run/react";
// INTERNAL
import { action } from "~/root";
import { useApp } from "~/providers/AppProvider";
import { ToastStatus } from "../ToastStack/ToastStack";
// EXTERNAL
import { SpinnerCircular } from "spinners-react";
// STYLES
import styles from "./Podcast Overview.module.css";

export default function PodcastOverview() {
  const { addToast } = useApp();
  const guestRequestFormRef = useRef<HTMLFormElement>(null);
  const topicRequestFormRef = useRef<HTMLFormElement>(null);
  const { Form, data, state, formData } = useFetcher<typeof action>();
  
  const isGuestRequestSubmitting =
  state === "submitting" && formData?.get("request-type") === "guest-request";
  const isTopicRequestSubmitting =
  state === "submitting" && formData?.get("request-type") === "topic-request";
  
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
      <video autoPlay muted controls>
        <source src="/assets/Xbox 2023-10-09 15-14-29.mp4" type="video/mp4" />
      </video>
      <div className={styles["upcoming-podcast"]}>
        <p>
          <strong>Next Podcast</strong>: Some Date
        </p>
        <p>
          <strong>Next Guest </strong>: Someone
        </p>
      </div>
      <ul id={styles["podcast-playlist"]}>
        <li>
          <p>Hip-Hop vs Mental Health Pt.3</p>
          <p>July 26, 2023</p>
        </li>
        <li>
          <p>Hip-Hop vs Mental Health Pt.2</p>
          <p>April 5, 2023</p>
        </li>
        <li>
          <p>Hip-Hop vs Mental Health Pt.1</p>
          <p>March 15, 2023</p>
        </li>
        <li>
          <p>Mental Health Pt.3</p>
          <p>March 15, 2023</p>
        </li>
        <li>
          <p>Mental Health Pt.2</p>
          <p>March 15, 2023</p>
        </li>
        <li>
          <p>Mental Health Pt.1</p>
          <p>March 15, 2023</p>
        </li>
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
