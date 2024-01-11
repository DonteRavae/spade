/* eslint-disable jsx-a11y/media-has-caption */
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
 * @returns
 */

const ForumItemCard = () => {
  return (
    <li className={styles["forum-item-card"]}>
      <div className={styles.sidebar}>
        <button className={styles["submitted-by"]}>
          <img src="" alt="Name's Avatar" />
          <p>Name</p>
        </button>
        <button className={styles.sidebarItem}>Flair</button>
        <div className={styles.sidebarItem}>Votes</div>
        <p className={styles.sidebarItem}>Comments</p>
        <div className={styles.sidebarItem}>Share</div>
        <button className={styles.sidebarItem}>Favorite</button>
      </div>
      <div className={styles["content-container"]}>
        <h1 className={styles.title}>Title goes here</h1>
        {/* 
        -- CONTENT --
           
           --Image, Video, and Text content will be interchangeable depending on content type 
        */}

        {/* <img className={styles.content} src="" alt="Post Content"/> */}
        {/* <video className={styles.content} src=""/> */}
        <p className={styles.content}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          quaerat quas dolore necessitatibus, minus tempora. Tempora quisquam
          voluptates iure dolor sunt accusamus, fugit expedita at tempore nihil
          quas ducimus laboriosam?
        </p>
        <p className={styles.posted}>Posted 6 hours ago</p>
      </div>
    </li>
  );
};

export default function Forum() {
  return (
    <ul id={styles["forum"]}>
      <ForumItemCard />
      <ForumItemCard />
      <ForumItemCard />
      <ForumItemCard />
      <ForumItemCard />
      <ForumItemCard />
    </ul>
  );
}
