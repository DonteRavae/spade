/* eslint-disable jsx-a11y/media-has-caption */

// REMIX
import { Link, useFetcher } from "@remix-run/react";
// INTERNAL
import Icons from "../Icons";
import UserAvatar from "../UserAvatar/UserAvatar";
import { ForumPost, UserProfile } from "~/utils/db/community/types.server";
// STYLES
import styles from "./Forum.module.css";

const findTimeSinceCreated = (timestamp: string): string => {
  const timeCreated = Date.parse(timestamp);
  const now = Date.now();

  const timeDiff = Math.floor((now - timeCreated) / 60000);
  const oneDay = 60 * 24;
  const oneHour = 60;

  if (timeDiff > oneDay) return `${Math.floor(timeDiff / oneDay)}d`;
  else if (timeDiff > oneHour) return `${Math.floor(timeDiff / oneHour)}h`;
  else if (timeDiff > 1) return `${Math.floor(timeDiff)}m`;

  return "moments ago";
};

const ForumItemCard = ({ post }: { post: ForumPost }) => {
  const {
    id,
    title,
    content,
    contentType,
    submittedBy,
    votes,
    createdAt,
    flair,
  } = post;
  const { username, avatarUrl } = submittedBy as UserProfile;
  // DEFAULT FOR NOW
  const favorite = true;
  const fetcher = useFetcher();

  return (
    <li className={styles["forum-item-card"]}>
      <Link
        className={styles["sidebar"]}
        to={`/community/users/${username}`}
        title={username}
      >
        <UserAvatar avatarUrl={avatarUrl} avatarAlt={`${username}'s avatar`} />
        <p className={styles.alias}>{username}</p>
        <p className={styles.posted}>{findTimeSinceCreated(createdAt!)}</p>
      </Link>

      <div className={styles["content-container"]}>
        <Link
          className={styles.postContent}
          to={`/community/users/${username}/posts/${id}`}
        >
          <h1 className={styles.title}>{title}</h1>

          {contentType === "text" && content ? (
            <p className={styles.content}>{content}</p>
          ) : contentType === "image" && content ? (
            <img className={styles.content} src="" alt="Post Content" />
          ) : contentType === "video" && content ? (
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
              value={votes! + 1}
            >
              <Icons type="caret-up" />
            </button>
            {votes}
            <button
              className={styles.downvote}
              aria-label="Downvote post"
              name="vote"
              value={votes! - 1}
            >
              <Icons type="caret-down" />
            </button>
          </fetcher.Form>
          <Link
            to={`/community/users/${username}/posts/${id}/#comments`}
            className={`${styles["footer-item"]} ${styles.comments}`}
          >
            <Icons type="comment" />
            {/* {comments} */}0
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

export default function Forum({
  posts,
}: {
  posts: ForumPost[] | null | undefined;
}) {
  return (
    <ul id={styles["forum"]}>
      {posts
        ? posts.map((post) => <ForumItemCard key={post.id} post={post} />)
        : null}
    </ul>
  );
}
