import CommunityOverview from "~/components/CommunityOverview/CommunityOverview";
import PageContainer from "~/components/PageContainer/PageContainer";
import PodcastOverview from "~/components/Podcast Overview/Podcast Overview";
import styles from "./styles/Home.module.css";

export default function HomeLayout() {
  return (
    <PageContainer id={styles["home-page"]}>
      <PodcastOverview />
      <CommunityOverview />
      <section>EXTRAS</section>
    </PageContainer>
  );
}
