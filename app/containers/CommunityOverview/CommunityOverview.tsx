/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// REACT
import { useEffect, useRef, useState } from "react";
// REMIX
import { NavLink, Outlet, useLocation, useNavigation } from "@remix-run/react";
// INTERNAL
import { useApp } from "~/providers/AppProvider";
import Modal, { ModalRef } from "../../components/Modal/Modal";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm";
// STYLES
import styles from "./CommunityOverview.module.css";

enum TABS {
  RECENT = "recent",
  TRENDING = "trending",
  POPULAR = "popular",
}

export default function CommunityOverview() {
  const { profile } = useApp();
  const location = useLocation();
  const navigation = useNavigation();
  const modalRef = useRef<ModalRef>(null);
  const [activeTab, setActiveTab] = useState<string>(
    location.pathname.substring(1) || TABS.RECENT
  );
  const [isAnnouncementsOpen, toggleAnnouncements] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === "/") setActiveTab(TABS.RECENT);
  }, [location]);

  // HANDLERS
  const openModal = () => modalRef.current?.open();
  const closeAnnouncements = () => toggleAnnouncements((prev) => !prev);

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
