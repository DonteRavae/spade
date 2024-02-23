import { useCallback, useEffect, useRef, useState } from "react";
// REMIX
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  Outlet,
  json,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
// INTERNAL
import {
  convertEpisodeDurationToReadable,
  convertEpisodeReleaseDateToLocaleString,
  filterPodcastCatalogBySeason,
} from "~/utils/lib/helpers";
import { SortBy } from "~/utils/lib/types";
import { getAllPodcasts } from "~/utils/handlers/podcast.server";
import PageContainer from "~/containers/PageContainer/PageContainer";
import Dropdown, { DropdownRef } from "~/components/Dropdown/Dropdown";
import ShareController from "~/components/ShareController/ShareController";
import FavoriteController from "~/components/FavoriteController/FavoriteController";
// STYLES
import styles from "./styles/PodcastLayout.module.css";

/**
 * Until the Buzzsprout gives me a better way to check the current season,
 * the number of seasons available will be hardcoded.
 */
const NUMBER_OF_SEASONS = 5;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let catalog = await getAllPodcasts();
  const url = new URL(request.url);
  const season = url.searchParams.get("season");

  if (season) {
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
  const { pathname } = useLocation();
  const sortRef = useRef<DropdownRef>(null);
  const { catalog } = useLoaderData<typeof loader>();
  const [sortBy, setSortBy] = useState<string>(SortBy.Latest);
  const [filterBy, setFilterBy] = useState<string>(
    `Season ${NUMBER_OF_SEASONS}`
  );

  const handleSort = useCallback(
    (sortBy: string) => {
      if (sortBy === SortBy.Latest) {
        catalog.sort(
          (a, b) => Date.parse(b.published_at) - Date.parse(a.published_at)
        );
        setSortBy(SortBy.Latest);
      } else if (sortBy === SortBy.Oldest) {
        catalog.sort(
          (a, b) => Date.parse(a.published_at) - Date.parse(b.published_at)
        );
        setSortBy(SortBy.Oldest);
      }

      sortRef.current?.closeMenu();
    },
    [catalog]
  );

  useEffect(() => {
    // Sorts calalog when a filter changes causes route change
    handleSort(sortBy);
  }, [handleSort, sortBy]);

  return (
    <PageContainer id={styles["podcast-page-layout"]}>
      <nav>
        <div className={styles.filters}>
          <Dropdown selected={filterBy}>
            {Array.from({ length: NUMBER_OF_SEASONS }, (_, i) => (
              <li key={i + 1} className={styles["dropdown-option"]}>
                <Link
                  onClick={() => setFilterBy(`Season ${i + 1}`)}
                  to={`${pathname}?season=${i + 1}`}
                >{`Season ${i + 1}`}</Link>
              </li>
            ))}
          </Dropdown>
          <Dropdown selected={sortBy} ref={sortRef}>
            {Object.entries(SortBy).map(([sort, sortBy]) => (
              <li key={sort} className={styles["dropdown-option"]}>
                <button onClick={() => handleSort(sortBy)}>{sortBy}</button>
              </li>
            ))}
          </Dropdown>
        </div>

        <menu className={styles["catalog-menu"]}>
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
