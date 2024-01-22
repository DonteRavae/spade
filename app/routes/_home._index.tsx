/* eslint-disable jsx-a11y/media-has-caption */
// REMIX
import type { MetaFunction } from "@remix-run/node";
// INTERNAL
// import PageContainer from "../components/PageContainer/PageContainer";
// import PodcastOverview from "~/components/Podcast Overview/Podcast Overview";
// import CommunityOverview from "~/components/CommunityOverview/CommunityOverview";
// STYLES
// import styles from "./styles/Home.module.css";
import Forum from "~/components/Forum/Forum";

export const meta: MetaFunction = () => {
  return [
    { title: "SPADE Mental Health | Home" },
    {
      name: "description",
      content:
        "SPADE Mental Health provides Suicide, PTSD, Anxiety, Depression, and Epilepsy awareness for the African American community.",
    },
  ];
};

export default function Home() {
  return <Forum />;
}
