// REACT
import { useState } from "react";
// REMIX
import { Form } from "@remix-run/react";
import auth from "~/utils/db/auth/config";
// INTERNAL
import Icons from "../Icons";
// EXTERNAL
import { signOut } from "firebase/auth";
// STYLES
import styles from "./AccountDropdown.module.css";

export default function AccountDropdown({
  username,
  avatar,
}: {
  username: string;
  avatar: string;
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleClick = () => setShowMenu((prev) => !prev);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div id={styles["account-dropdown-container"]}>
      <button
        id={styles["account-dropdown-btn"]}
        className={showMenu ? styles.show : ""}
        onClick={handleClick}
      >
        <h4>{username}</h4>
        <img src={avatar} alt="Name's Avatar" />
        <Icons type="caret-down" />
      </button>
      <menu
        id={styles["account-dropdown-menu"]}
        className={showMenu ? styles.show : ""}
        onBlur={() => setShowMenu(false)}
      >
        <Form method="post" action="logout" onSubmit={handleLogout}>
          <button id={styles["logout-btn"]} type="submit">
            <Icons type="logout" />
            Logout
          </button>
        </Form>
      </menu>
    </div>
  );
}
