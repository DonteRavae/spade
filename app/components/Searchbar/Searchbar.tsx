// REACT
import { useEffect } from "react";
// REMIX
import { Form } from "@remix-run/react";
// INTERNAL
import Icons from "../Icons";
// STYLES
import styles from "./Searchbar.module.css";

export default function Searchbar({ value }: { value?: string | null }) {

  useEffect(() => {
    console.log(value);
    const searchField = document.getElementById(styles.q);
    if (searchField instanceof HTMLInputElement) {
      searchField.value = value || "";
    }
  }, [value]);

  return (
    <Form id={styles["app-search"]} role="search">
      <Icons type="search" className={styles.searchIcon} />
      <input
        type="search"
        aria-label="Search SPADE"
        id={styles["q"]}
        name="q"
        placeholder="Search SPADE"
        defaultValue={value || ""}
      />
    </Form>
  );
}
