// REMIX
import { Form } from "@remix-run/react";
// STYLES
import styles from "./Podcast Overview.module.css";

export default function PodcastOverview() {
  return (
    <section id={styles["podcast-overview"]}>
      <h1 className={styles["section-title"]}>Podcast</h1>
      <section id={styles["podcast-preview"]}>
        <video autoPlay muted controls>
          <source src="/assets/Xbox 2023-10-09 15-14-29.mp4" type="video/mp4" />
        </video>
        <p>
          <strong>Next Podcast</strong>: Some Date
        </p>
        <p>
          <strong>Next Guest </strong>: Someone
        </p>
        <ul>
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
      </section>
      <Form>
        <h3>
          Who would you like to hear from next? Drop their details below so that
          we can reach out!
        </h3>
        <div>
          <label htmlFor={styles["guest-name"]}>Name:</label>
          <input type="text" id={styles["guest-name"]} />
        </div>
        <div>
          <label htmlFor={styles["guest-occupation"]}>Occupation:</label>
          <input type="text" id={styles["guest-occupation"]} />
        </div>
        <div>
          <label htmlFor={styles["guest-contact"]}>
            Contact (e-mail or website):
          </label>
          <input type="text" id={styles["guest-contact"]} />
        </div>
      </Form>
      <Form>
        <h3 id={styles["topic-recommendation"]}>
          Got a topic you think we should cover? Tell us below!
        </h3>
        <textarea placeholder="What should we talk about?" />
      </Form>
    </section>
  );
}
