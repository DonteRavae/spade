// REACT
import { useEffect, useState } from "react";
// REMIX
import {
  Form,
  NavLink,
  Outlet,
  useLocation,
  useOutletContext,
} from "@remix-run/react";
// INTERNAL
import Icons from "../Icons";
import { AuthContext } from "~/root";
import FormInput from "../FormInput/FormInput";
import HeroSlider from "../HeroSlider/HeroSlider";
// STYLES
import styles from "./CommunityOverview.module.css";

enum TABS {
  RECENT = "recent",
  TRENDING = "trending",
  POPULAR = "popular",
  TOPICS = "topics",
}

export default function CommunityOverview() {
  const location = useLocation();
  const { profile } = useOutletContext<AuthContext>();
  const [activeTab, setActiveTab] = useState<string>(TABS.RECENT);
  const [isAnnouncementsOpen, toggleAnnouncements] = useState<boolean>(true);

  const closeAnnouncements = () => toggleAnnouncements((prev) => !prev);

  useEffect(() => {
    if (location.pathname === "/") setActiveTab(TABS.RECENT);
  }, [location]);
  
  return (
    <section id={styles["community-overview"]}>
      <h1 className={styles["section-title"]}>Community</h1>

      <div id={styles["community-overview-actions"]}>
        <HeroSlider toggleSlider={isAnnouncementsOpen} />
        {profile ? (
          <>
            <Form method="post" id={styles["create-post-form"]}>
              <img
                id={styles.avatar}
                src={profile.avatar}
                alt={`${profile.username}'s Avatar`}
              />
              <FormInput
                id={styles["create-post-input"]}
                name="create-post-input"
                placeholder={`What's on your mind ${profile.username}?`}
                inputContainerClassName={styles["form-input-container"]}
                inputClassName={styles["form-input"]}
                required
              />
              <button id={styles["create-post-with-image-btn"]}>
                <Icons type="add-image" />
              </button>
            </Form>
            <hr />
          </>
        ) : null}
        <nav
          id={styles["community-overview-navigation"]}
          className={!isAnnouncementsOpen ? styles.close : ""}
        >
          <NavLink
            className={`${styles["forum-filter"]} ${
              activeTab === TABS.RECENT ? styles.active : ""
            }`}
            onClick={() => setActiveTab(TABS.RECENT)}
            to="/recent"
          >
            Recent
          </NavLink>
          <NavLink
            className={`${styles["forum-filter"]} ${
              activeTab === TABS.TRENDING ? styles.active : ""
            }`}
            onClick={() => setActiveTab(TABS.TRENDING)}
            to="/trending"
          >
            Trending
          </NavLink>
          <NavLink
            className={`${styles["forum-filter"]} ${
              activeTab === TABS.POPULAR ? styles.active : ""
            }`}
            onClick={() => setActiveTab(TABS.POPULAR)}
            to="/popular"
          >
            Popular
          </NavLink>
          <NavLink
            className={`${styles["forum-filter"]} ${
              activeTab === TABS.TOPICS ? styles.active : ""
            }`}
            onClick={() => setActiveTab(TABS.TOPICS)}
            to="/topics"
          >
            Topics
          </NavLink>
          <button
            className={`${styles["forum-filter"]}`}
            onClick={closeAnnouncements}
          >
            Announcements
          </button>
        </nav>
      </div>

      <Outlet />
    </section>
  );
}
