// REMIX
import { Link, json, useLoaderData } from "@remix-run/react";
// INTERNAL
import Icons from "~/components/Icons";
import { getPodcastEpisodesWithComments } from "~/utils/handlers/podcast.server";
// STYLES
import styles from "./styles/PodcastHome.module.css";
import { formatEpisodeLinkHref, formatEpisodeTitle } from "~/utils/lib/helpers";

export const loader = async () => {
  const { success, payload } = await getPodcastEpisodesWithComments();
  return json({ discussionSample: success ? payload.slice(0, 4) : [] });
};

export default function PodcastHome() {
  const { discussionSample } = useLoaderData<typeof loader>();
  return (
    <section id={styles["podcast-home"]}>
      <header>
        <div id={styles["podcast-info"]}>
          <h1 id={styles["podcast-title"]}>SPADE: The Podcast</h1>
          <p id={styles["podcast-host"]}>
            Hosted by: Paul Anthony Henderson, Jr
          </p>
          <p id={styles["podcast-description"]}>
            {`SPADE: The Podcast, which represents Suicide, Post Traumatic Stress
          Disorder, Anxiety, Depression, and Epilepsy, looks to spread awareness
          to the African American community with respect to mental health. It's
          time the African American community speak on this difficult subject
          and face it head on. The following material is intended to provide
          educational awareness and promote dialogue within the community.`}
          </p>
        </div>
        <img
          id={styles["podcast-logo"]}
          src="/assets/spade_logo_with_branding.jpg"
          alt="SPADE Logo"
        />
      </header>
      <section id={styles["upcoming-episode"]}>
        <h3>New episodes every tuesday</h3>
        <p>March 5, 2024</p>
        <p>Hip Hop vs. Mental Health Pt.2</p>
      </section>
      <section id={styles["discussions-overview"]}>
        <h3>Did we miss something? Keep the conversation going.</h3>
        <Link to="/podcast/discussions" id={styles["discussion-cta"]}>
          Join A Discussion
        </Link>
        <ul>
          {discussionSample.map((ep) => (
            <li key={ep.id} className={styles["episode-discussion-card"]}>
              <Link to={formatEpisodeLinkHref(ep.id, ep.title, true)}>
                <img src={ep.artworkUrl} alt="Episode Cover Art" />
                <p>
                  {formatEpisodeTitle(
                    ep.seasonNumber,
                    ep.episodeNumber,
                    ep.title
                  )}
                </p>
                <div>
                  <Icons type="comment" /> <span>{ep.commentsTotal}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section id={styles["host-overview"]}>
        <h2>Meet Your Host</h2>
        <div>
          <p>
            {`In 2004, during his freshman year in high school, Anthony was
          diagnosed with Epilepsy. As a result of the prescribed medication and
          occasional seizure, he suffers from short-term memory loss.`}{" "}
          </p>
          <p>
            {`
          “I can
          recall one day at band class feeling terribly unwell and having to go
          home. Lying in bed, I had 5 seizures in a row. During my 6th, I black
          out. Turns out it was a grand mal seizure. Afterwards, I would come to
          learn I have epilepsy. I used to be ashamed but now I'm embracing it
          and proudly publicizing my status as an epileptic warrior.`}
          </p>
          <p>
            {`
          **DISCLAIMER: I AM NOT A LICENSED MEDICAL PROFESSIONAL, NOR AM I
          CLAIMING TO BE.`}
          </p>
        </div>
        <figure>
          <img
            src="/assets/anthony_host.jpg"
            alt="Podcast Host: Paul Anthony Henderson, Jr"
          />
          <figcaption>Paul Anthony Henderson, Jr.</figcaption>
        </figure>
      </section>
    </section>
  );
}
