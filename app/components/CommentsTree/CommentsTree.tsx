// INTERNAL
import Icons from "../Icons";
import { ForumComment } from "~/utils/db/community/types.server";
// STYLES
import styles from "./CommentsTree.module.css";

type CommentsTreeProps = {
  comments: ForumComment[];
};

const EmptyCommentsMessage = () => (
  <div id={styles["empty-comments-message"]}>
    <h3>No Comments Yet</h3>
    <Icons type="comment" />
    <p>Be the first to leave a comment!</p>
  </div>
);

const Comment = () => <article className={styles.comment}>COMMENT</article>;

const CommentsTreeToolbar = () => (
  <div id={styles["comments-tree-toolbar"]}>
    {/* searchbar and comment sort will go here */}
  </div>
);

export default function CommentsTree({ comments }: CommentsTreeProps) {
  return (
    <section id={styles["comment-tree"]}>
      <CommentsTreeToolbar />
      {comments.length ? (
        comments.map((comment) => <Comment key={comment.id} />)
      ) : (
        <EmptyCommentsMessage />
      )}
    </section>
  );
}
