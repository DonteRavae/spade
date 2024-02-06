/* eslint-disable jsx-a11y/media-has-caption */

// REMIX
import { Link } from "@remix-run/react";
// INTERNAL
import Icons from "../Icons";
import UserAvatar from "../UserAvatar/UserAvatar";
import { findTimeSinceCreated } from "~/utils/helpers";
import { ForumPost, UserProfile } from "~/utils/db/community/types.server";
// STYLES
import styles from "./Forum.module.css";
import FavoriteController from "../FavoriteController/FavoriteController";
import VoteController from "../VoteController/VoteController";

const ForumItemCard = ({ post }: { post: ForumPost }) => {
  const {
    id,
    title,
    content,
    contentType,
    submittedBy,
    votes,
    createdAt,
    category,
  } = post;
  const { username, avatarUrl } = submittedBy as UserProfile;

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
          to={`community/users/${username}/posts/${id}`}
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
          <VoteController
            votesTotal={votes}
            parentId={id}
            direction="horizontal"
            theme="light"
          />
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
          <FavoriteController
            parentId={id}
            direction="horizontal"
            theme="light"
          />
          <Link
            to={`/community/${category}`}
            className={`${styles["footer-item"]} ${
              styles[category.toLowerCase()]
            } ${styles.category}`}
          >
            {category}
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
