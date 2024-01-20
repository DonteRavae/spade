/* eslint-disable jsx-a11y/media-has-caption */

// REMIX
import { Link, useFetcher } from "@remix-run/react";
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
  id: string;
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
    favorite: boolean;
    flair: string;
  };
};

const ForumItemCard = ({ item }: { item: ForumItem }) => {
  const { id, title, content } = item;
  const { submittedBy, votes, comments, posted, flair, favorite } = item.meta;
  const { alias, avatar } = submittedBy;
  const fetcher = useFetcher();
  return (
    <li className={styles["forum-item-card"]}>
      <Link className={styles["sidebar"]} to={`/community/u/${alias}`}>
        <img src={avatar} alt="Name's Avatar" />
        <p className={styles.alias}>{alias}</p>
        <p className={styles.posted}>{posted}</p>
      </Link>

      <div className={styles["content-container"]}>
        <Link className={styles.postContent} to={`/community/${flair}/${id}`}>
          <h1 className={styles.title}>{title}</h1>

          {content.type === "text" && content.value ? (
            <p className={styles.content}>{content.value}</p>
          ) : content.type === "image" && content.value ? (
            <img className={styles.content} src="" alt="Post Content" />
          ) : content.type === "video" && content.value ? (
            <video className={styles.content} src="" />
          ) : null}
        </Link>
        <footer>
          <fetcher.Form className={styles["footer-item"]} method="post">
            <input hidden readOnly value="vote-update" name="request-type" />
            <button
              className={styles.upvote}
              aria-label="Upvote post"
              name="vote"
              value={votes + 1}
            >
              <Icons type="caret-up" />
            </button>
            {votes}
            <button
              className={styles.downvote}
              aria-label="Downvote post"
              name="vote"
              value={votes - 1}
            >
              <Icons type="caret-down" />
            </button>
          </fetcher.Form>
          <Link
            to={`/community/${flair}/${id}/#comments`}
            className={`${styles["footer-item"]} ${styles.comments}`}
          >
            <Icons type="comment" />
            {comments}
          </Link>
          <button className={`${styles["footer-item"]} ${styles.share}`}>
            <Icons type="share" />
            Share
          </button>
          <fetcher.Form
            method="post"
            className={`${styles["footer-item"]} ${styles.favorite}`}
          >
            <input
              hidden
              readOnly
              value="favorite-update"
              name="request-type"
            />
            <button
              aria-label={
                favorite ? "Remove from favorites" : "Add to favorites"
              }
              value={favorite ? "false" : "true"}
              name="favorite"
            >
              {!favorite ? (
                <Icons type="empty-heart" />
              ) : (
                <Icons type="full-heart" />
              )}
              Favorite
            </button>
          </fetcher.Form>
          <Link
            to={`/community/${flair}`}
            className={`${styles["footer-item"]} ${
              styles[flair.toLowerCase()]
            } ${styles.flair}`}
          >
            {flair}
          </Link>
        </footer>
      </div>
    </li>
  );
};

export default function Forum() {
  const { anxiety } = forumData;

  return (
    <ul id={styles["forum"]}>
      {anxiety.map((item) => (
        <ForumItemCard key={item.meta.submittedBy.alias} item={item} />
      ))}
    </ul>
  );
}
