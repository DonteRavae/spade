// REMIX
import { Link } from "@remix-run/react";
// INTERNAL
import Icons from "../Icons";
// STYLES
import styles from "./CommentsController.module.css";

export default function CommentsController({
  commentsCount,
  direction,
  destination,
  noText,
}: {
  commentsCount: number;
  direction: "horizontal" | "vertical";
  destination: string;
  noText?: boolean;
}) {
  return (
    <Link
      to={destination}
      className={`${styles[direction]} ${styles["comments-controller"]}`}
    >
      <Icons type="comment" />
      <span>{commentsCount}</span>
      {!noText && <span>{`Comment${commentsCount !== 1 ? "s" : ""}`}</span>}
    </Link>
  );
}
