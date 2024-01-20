// STYLES
import styles from "./AccountDropdown.module.css";

export default function AccountDropdown({
  username,
  avatar,
}: {
  username: string;
  avatar: string;
}) {
  return (
    <>
      <button id={styles["account-dropdown-btn"]}>
        <h4>{username}</h4>
        <img src={avatar} alt="Name's Avatar" />
      </button>
      <menu id={styles["account-dropdown-menu"]}></menu>
    </>
  );
}
