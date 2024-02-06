// REMIX
import { Form } from "@remix-run/react";
// INTERNAL
import Icons from "../Icons";
import { ForumComment } from "~/utils/db/community/types.server";
// STYLES
import styles from "./CommentsTree.module.css";

type CommentsTreeProps = {
  comments: ForumComment[];
};

const CommentInputForm = () => (
  <Form method="post" className={styles["add-comment-form"]}>
    <textarea
      className={styles["comment-input"]}
      placeholder="How does this make you feel?"
      required
    />
    <button type="submit" className={styles["comment-submit-btn"]}>
      Comment
    </button>
  </Form>
);

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
    <section id="comments">
      <CommentInputForm />
      <hr />
      <CommentsTreeToolbar />
      {comments.length ? (
        comments.map((comment) => <Comment key={comment.id} />)
      ) : (
        <EmptyCommentsMessage />
      )}
    </section>
  );
}
