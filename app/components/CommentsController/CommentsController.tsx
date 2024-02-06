// REMIX
import { Link } from "@remix-run/react";
// INTERNAL
import Icons from "../Icons";
// STYLES
import styles from "./CommentsController.module.css";

export default function CommentsController({
  commentsCount,
  direction,
  theme,
  destination,
}: {
  commentsCount: number;
  direction: "horizontal" | "vertical";
  theme: "light" | "dark";
  destination: string;
}) {
  return (
    <section
      className={`${styles["comments-controller"]} ${styles[`${theme}`]}`}
    >
      <Link to={destination} className={styles[`${direction}`]}>
        <Icons type="comment" />
        <span>{commentsCount}</span>
        <span>{`Comment${commentsCount !== 1 ? "s" : ""}`}</span>
      </Link>
    </section>
  );
}
