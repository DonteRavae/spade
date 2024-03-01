/* eslint-disable jsx-a11y/media-has-caption */

// REACT
import { useRef } from "react";
// REMIX
import { Link, useNavigation } from "@remix-run/react";
// INTERNAL
import Icons from "../../components/Icons";
import { useApp } from "~/providers/AppProvider";
import { findTimeSinceCreated } from "~/utils/lib/helpers";
import Modal, { ModalRef } from "../../components/Modal/Modal";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { ForumPost, UserProfile } from "~/utils/lib/types.server";
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm";
import VoteController from "../../components/VoteController/VoteController";
import ShareController from "../../components/ShareController/ShareController";
import CommentsController from "../../components/CommentsController/CommentsController";
import FavoriteController from "../../components/FavoriteController/FavoriteController";
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
    <li className={styles["forum-post-card"]}>
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
          className={styles["post-content"]}
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
          />
          <CommentsController
            commentsCount={commentsCount}
            direction="horizontal"
            destination={`/community/users/${username}/posts/${id}#comments`}
          />
          <ShareController direction="horizontal" />
          <FavoriteController
            parentId={id}
            direction="horizontal"
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
  const { profile } = useApp();
  const navigation = useNavigation();
  const modalRef = useRef<ModalRef>(null);

  // HANDLERS
  const openModal = () => modalRef.current?.open();

  return !posts || !posts.length ? (
    <section id={styles["empty-forum"]}>
      <h2>{"It's looking a tad dry around here."}</h2>
      {profile ? (
        <>
          <button
            className={styles["create-post-btn"]}
            onClick={openModal}
            aria-label="Create a forum post"
          >
            <Icons type="edit" />
          </button>
          {navigation.state !== "loading" && (
            <Modal label="Create A Post" ref={modalRef}>
              <CreatePostForm />
            </Modal>
          )}
          <p>Start a discussion!</p>
        </>
      ) : (
        <>
          <Icons type="edit" />
          <p>
            <Link to="/login">Login</Link> and start a discussion!
          </p>
        </>
      )}
    </section>
  ) : (
    <ul id={styles["forum"]}>
      {posts
        ? posts.map((post) => <ForumPostCard key={post.id} post={post} />)
        : null}
    </ul>
  );
}
