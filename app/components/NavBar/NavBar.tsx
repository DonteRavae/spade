// REMIX
import { Link } from "@remix-run/react";
// INTERNAL
import Icons from "../Icons";
// STYLES
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav id={styles["app-navbar"]}>
      <menu>
        <li>
          <Link to="/community" className={styles["nav-link"]}>
            <Icons type="community" />
            Community
          </Link>
        </li>
        <li>
          <Link to="/podcast" className={styles["nav-link"]}>
            <Icons type="podcast" /> Podcast
          </Link>
        </li>
        <li>
          <Link to="/store" className={styles["nav-link"]}>
            <Icons type="store" />
            Store
          </Link>
        </li>
        <li>
          <Link to="/" className={styles.logo}>
            <img src="/assets/spade_logo.png" alt="logo" />
          </Link>
        </li>
        <li>
          <Link
            to="https://www.instagram.com/spadementalhealth/"
            className={styles["nav-link"]}
          >
            <Icons type="brand-instagram" /> Instagram
          </Link>
        </li>
        <li>
          <Link
            to="https://www.tiktok.com/@spadementalhealth"
            className={styles["nav-link"]}
          >
            <Icons type="brand-tiktok" /> TikTok
          </Link>
        </li>
        <li>
          <Link
            to="https://www.youtube.com/@spadementalhealth"
            className={styles["nav-link"]}
          >
            <Icons type="brand-youtube" /> YouTube
          </Link>
        </li>
      </menu>
    </nav>
  );
}
