/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// REACT
import { useEffect, useRef, useState } from "react";
// REMIX
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
// INTERNAL
import Icons from "../Icons";
import { AppContext } from "~/root";
import Modal, { ModalRef } from "../Modal/Modal";
import UserAvatar from "../UserAvatar/UserAvatar";
import HeroSlider from "../HeroSlider/HeroSlider";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
// STYLES
import styles from "./CommunityOverview.module.css";

enum TABS {
  RECENT = "recent",
  TRENDING = "trending",
  POPULAR = "popular",
  TOPICS = "topics",
}

export default function CommunityOverview() {
  const modalRef = useRef<ModalRef>(null);
  const location = useLocation();
  const navigation = useNavigation();
  const rootContext = useOutletContext<AppContext>();
  const [activeTab, setActiveTab] = useState<string>(TABS.RECENT);
  const [isAnnouncementsOpen, toggleAnnouncements] = useState<boolean>(true);
  const { profile } = rootContext;

  useEffect(() => {
    if (location.pathname === "/") setActiveTab(TABS.RECENT);
  }, [location]);

  // HANDLERS
  const closeAnnouncements = () => toggleAnnouncements((prev) => !prev);
  const openModal = () => modalRef.current?.open();

  return (
    <section id={styles["community-overview"]}>
      <h1 className={styles["section-title"]}>Community</h1>

      <div id={styles["community-overview-actions"]}>
        {/* ANNOUNCEMENTS */}
        <HeroSlider toggleSlider={isAnnouncementsOpen} />

        {/* CREATE NEW POST */}
        {profile ? (
          <>
            <section id={styles["create-post-form"]}>
              <UserAvatar
                avatarUrl={profile.avatarUrl}
                avatarAlt={`${profile.username}'s avatar`}
              />
              <div
                className={styles["create-post-selector"]}
                onClick={openModal}
              >
                <p>{`What's on your mind ${profile.username}?`}</p>
              </div>
              <button
                id={styles["create-post-with-image-btn"]}
                onClick={openModal}
              >
                <Icons type="add-image" />
              </button>
              {navigation.state !== "loading" && (
                <Modal label="Create A Post" ref={modalRef}>
                  <CreatePostForm />
                </Modal>
              )}
            </section>
            <hr className={styles["actions-divider"]} />
          </>
        ) : null}

        {/* FORUM NAVIGATION */}
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

      <Outlet context={rootContext} />
    </section>
  );
}
