// STYLES
import { useState } from "react";
import Icons from "../Icons";
import styles from "./AccountDropdown.module.css";
import { Form, useFetcher } from "@remix-run/react";
import auth from "~/utils/db/auth/config";
import { signOut } from "firebase/auth";

export default function AccountDropdown({
  username,
  avatar,
}: {
  username: string;
  avatar: string;
}) {
  const fetcher = useFetcher();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleClick = () => setShowMenu((prev) => !prev);

  const handleLogout = async () => {
    await signOut(auth);
    fetcher.submit({ "logout-user": true }, { method: "post" });
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
      >
        <Form method="post">
          <button
            id={styles["logout-btn"]}
            type="submit"
            onClick={handleLogout}
          >
            <Icons type="logout" />
            Logout
          </button>
        </Form>
      </menu>
    </div>
  );
}
