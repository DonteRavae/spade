// REMIX
import { MetaFunction } from "@remix-run/node";
// INTERNAL
import PageContainer from "~/components/PageContainer/PageContainer";
import PodcastOverview from "~/components/PodcastOverview/PodcastOverview";
import CommunityOverview from "~/components/CommunityOverview/CommunityOverview";
// STYLES
import styles from "./styles/Home.module.css";

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

export default function HomeLayout() {
  return (
    <PageContainer id={styles["home-page"]}>
      <PodcastOverview />
      <CommunityOverview />
      <aside>EXTRAS</aside>
    </PageContainer>
  );
}
