// REMIX
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, json, useLoaderData } from "@remix-run/react";
// INTERNAL
import {
  convertEpisodeDurationToReadable,
  convertEpisodeReleaseDateToLocaleString,
  filterPodcastCatalogBySeason,
} from "~/utils/lib/helpers";
import { getAllPodcasts } from "~/utils/handlers/podcast.server";
import PageContainer from "~/containers/PageContainer/PageContainer";
import ShareController from "~/components/ShareController/ShareController";
import FavoriteController from "~/components/FavoriteController/FavoriteController";
// STYLES
import styles from "./styles/PodcastLayout.module.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let catalog = await getAllPodcasts();

  const url = new URL(request.url);
  const season = url.searchParams.get("season");

  if (season) {
    // Get episodes from season
    catalog = filterPodcastCatalogBySeason(catalog, Number(season));
  }

  return json({ catalog });
};

const PodcastEpisodeListItem = ({
  episodeId,
  episodeTitle,
  episodeHost,
  episodeDuration,
  episodeReleaseDate,
  episodeCoverArtUrl,
}: {
  episodeId: number;
  episodeTitle: string;
  episodeHost: string;
  episodeDuration: number;
  episodeReleaseDate: string;
  episodeCoverArtUrl: string;
}) => (
  <li className={styles["podcast-episode-list-item"]}>
    <Link
      className={styles["episode-link"]}
      to={`/podcast/ep/${episodeTitle.substring(1).replace(/\s/g, "-")}`}
    />
    <img src={episodeCoverArtUrl} alt="Episode Season Cover Art" />
    <div className={styles["episode-title-and-host"]}>
      <p className={styles["episode-title"]}>{episodeTitle}</p>
      <p className={styles["episode-host"]}>{episodeHost}</p>
    </div>
    <p className={styles["episode-release-date"]}>
      {convertEpisodeReleaseDateToLocaleString(episodeReleaseDate)}
    </p>
    <p className={styles["episode-duration"]}>
      {convertEpisodeDurationToReadable(episodeDuration)}
    </p>
    <div className={styles.controllers}>
      <FavoriteController
        parentId={String(episodeId)}
        direction={"horizontal"}
        noText
      />
      <ShareController direction={"horizontal"} noText />
    </div>
  </li>
);

export default function PodcastPagesLayout() {
  const { catalog } = useLoaderData<typeof loader>();
  return (
    <PageContainer id={styles["podcast-page-layout"]}>
      <nav>
        <div className={styles.filters}>
          <select name="seasonFilter" id="seasonFilter">
            <option disabled>Filter By</option>
            <option value={1}>Season 1</option>
            <option value={2}>Season 2</option>
            <option value={3}>Season 3</option>
            <option value={4}>Season 4</option>
            <option value={5}>Season 5</option>
          </select>
          <select name="episodeFilter" id="episodeFilter">
            <option disabled>Sort By</option>
            <option>Latest to Oldest</option>
            <option>Oldest to Latest</option>
            <option>Duration</option>
          </select>
        </div>

        <menu>
          {catalog.map((ep) => (
            <PodcastEpisodeListItem
              key={ep.id}
              episodeId={ep.id}
              episodeTitle={`#${ep.season_number * 100 + ep.episode_number} ${
                ep.title
              }`}
              episodeHost={ep.artist}
              episodeDuration={ep.duration}
              episodeReleaseDate={ep.published_at}
              episodeCoverArtUrl={ep.artwork_url}
            />
          ))}
        </menu>
      </nav>
      <Outlet />
    </PageContainer>
  );
}
