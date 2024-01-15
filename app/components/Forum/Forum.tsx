/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect } from "react";
// INTERNAL
import Icons from "../Icons";
import forumData from "../../utils/db/forum.json";
// STYLES
import styles from "./Forum.module.css";

/**
 * Forum Item will need the following props passed down
 * - User name, avatar, and alias or id
 * - Flair
 * - Vote Count
 * - Number of comments
 * - Maybe details to share (Need to look into this)
 * - Post Details
 *   -- Title
 *   -- Content
 *   -- Posted Timestamp
 */

type ForumItem = {
  title: string;
  content: {
    type: string;
    value: string;
  };
  meta: {
    submittedBy: {
      alias: string;
      avatar: string;
    };
    votes: number;
    comments: number;
    posted: string;
    favorites: number;
  };
};

const ForumItemCard = ({ item, flair }: { item: ForumItem; flair: string }) => {
  const { title, content } = item;
  const { submittedBy, votes, comments, posted } = item.meta;
  const { alias, avatar } = submittedBy;
  return (
    <li className={styles["forum-item-card"]}>
      <button className={styles["sidebar"]}>
        <img src={avatar} alt="Name's Avatar" />
        <p className={styles.alias}>{alias}</p>
        <p className={styles.posted}>{posted}</p>
      </button>

      <div className={styles["content-container"]}>
        <h1 className={styles.title}>{title}</h1>

        {content.type === "text" && content.value ? (
          <p className={styles.content}>{content.value}</p>
        ) : content.type === "image" && content.value ? (
          <img className={styles.content} src="" alt="Post Content" />
        ) : content.type === "video" && content.value ? (
          <video className={styles.content} src="" />
        ) : null}
        <footer>
          <div className={styles["footer-item"]}>
            <button className={styles.upvote}>
              <Icons type="caret-up" />
            </button>
            {votes}
            <button className={styles.downvote}>
              <Icons type="caret-down" />
            </button>
          </div>
          <button className={`${styles["footer-item"]} ${styles.comments}`}>
            <Icons type="comment" />
            {comments}
          </button>
          <button className={`${styles["footer-item"]} ${styles.share}`}>
            <Icons type="share" />
            Share
          </button>
          <button className={`${styles["footer-item"]} ${styles.favorite}`}>
            <Icons type="empty-heart" />
            Favorite
          </button>
          <button
            className={`${styles["footer-item"]} ${
              styles[flair.toLowerCase()]
            } ${styles.flair}`}
          >
            {flair.toUpperCase()}
          </button>
        </footer>
      </div>
    </li>
  );
};

export default function Forum() {
  const { anxiety } = forumData;
  useEffect(() => {
    console.log(anxiety);
  }, [anxiety]);

  return (
    <ul id={styles["forum"]}>
      {anxiety.map((item) => (
        <ForumItemCard
          key={item.meta.submittedBy.alias}
          item={item}
          flair="ANXIETY"
        />
      ))}
    </ul>
  );
}
