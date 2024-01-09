// STYLES
import styles from "./AccountDropdown.module.css";

export default function AccountDropdown() {
  return (
    <>
      <button id={styles["account-dropdown-btn"]}>
        <h4>Name</h4>
        <img src="" alt="Name's Avatar" />
      </button>
      <menu id={styles["account-dropdown-menu"]}></menu>
    </>
  );
}
