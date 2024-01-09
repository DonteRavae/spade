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
          <Link to="/community">
            <Icons type="community" />
            Community
          </Link>
        </li>
        <li>
          <Link to="/podcast">
            <Icons type="podcast" /> Podcast
          </Link>
        </li>
        <li>
          <Link to="/store">
            <Icons type="store" />
            Store
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src="/assets/spade_logo.jpg" alt="logo" />
          </Link>
        </li>
        <li>
          <Link to="https://www.instagram.com/spadementalhealth/">
            <Icons type="brand-instagram" /> Instagram
          </Link>
        </li>
        <li>
          <Link to="https://www.tiktok.com/@spadementalhealth">
            <Icons type="brand-tiktok" /> TikTok
          </Link>
        </li>
        <li>
          <Link to="https://www.youtube.com/@spadementalhealth">
            <Icons type="brand-youtube" /> YouTube
          </Link>
        </li>
      </menu>
    </nav>
  );
}
