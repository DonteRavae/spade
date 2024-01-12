/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect } from "react";
import forumData from "../../../utils/data/forum.json";
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
      <div className={styles.sidebar}>
        <button className={styles["submitted-by"]}>
          <img src={avatar} alt="Name's Avatar" />
          <p>{alias}</p>
        </button>
        <button className={styles.sidebarItem}>{flair.toUpperCase()}</button>
        <div className={styles.sidebarItem}>{votes}</div>
        <p className={styles.sidebarItem}>{comments}</p>
        <div className={styles.sidebarItem}>Share</div>
        <button className={styles.sidebarItem}>Favorite</button>
      </div>
      <div className={styles["content-container"]}>
        <h1 className={styles.title}>{title}</h1>
        {/* 
        -- CONTENT --
           
           --Image, Video, and Text content will be interchangeable depending on content type 
        */}

        {/* <img className={styles.content} src="" alt="Post Content"/> */}
        {/* <video className={styles.content} src=""/> */}
        {content.type === "text" ? (
          <p className={styles.content}>{content.value}</p>
        ) : null}
        <p className={styles.posted}>Posted {posted}</p>
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
