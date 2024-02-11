/* eslint-disable jsx-a11y/media-has-caption */

// REMIX
import { Link } from "@remix-run/react";
// INTERNAL
import UserAvatar from "../UserAvatar/UserAvatar";
import { findTimeSinceCreated } from "~/utils/db/helpers";
import VoteController from "../VoteController/VoteController";
import ShareController from "../ShareController/ShareController";
import CommentsController from "../CommentsController/CommentsController";
import FavoriteController from "../FavoriteController/FavoriteController";
import { ForumPost, UserProfile } from "~/utils/db/community/types.server";
// STYLES
import styles from "./Forum.module.css";

const ForumPostCard = ({ post }: { post: ForumPost }) => {
  const {
    id,
    title,
    content,
    contentType,
    submittedBy,
    votes,
    commentsCount,
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
          <VoteController
            votesTotal={votes}
            parentId={id}
            direction="horizontal"
            theme="light"
          />
          <CommentsController
            commentsCount={commentsCount}
            direction="horizontal"
            theme="light"
            destination={`/community/users/${username}/posts/${id}#comments`}
          />
          <ShareController direction="horizontal" theme="light" />
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
        ? posts.map((post) => <ForumPostCard key={post.id} post={post} />)
        : null}
    </ul>
  );
}
