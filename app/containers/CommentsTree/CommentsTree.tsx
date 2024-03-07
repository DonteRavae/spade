// REACT
import { useEffect, useRef } from "react";
// REMIX
import { useFetcher } from "@remix-run/react";
// INTERNAL
import Icons from "../../components/Icons";
import { useApp } from "~/providers/AppProvider";
import { findTimeSinceCreated } from "~/utils/lib/helpers";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { ToastStatus } from "../../components/ToastStack/ToastStack";
import { ForumComment, UserProfile } from "~/utils/lib/types.server";
import VoteController from "../../components/VoteController/VoteController";
import { action } from "~/routes/community_.users_.$userId.posts.$postId";

// EXTERNAL
import { SpinnerCircular } from "spinners-react";
// STYLES
import styles from "./CommentsTree.module.css";

type CommentsTreeProps = {
  comments: ForumComment[];
  postId: string;
};

const CommentInputForm = ({ parentId }: { parentId: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { profile, addToast } = useApp();
  const { Form, data, state, formData } = useFetcher<typeof action>();

  const isSubmitting =
    state === "submitting" && formData?.get("request-type") === "add-comment";

  useEffect(() => {
    if (data?.action === "add-comment" && data.success) {
      formRef.current?.reset();
      addToast(ToastStatus.Success, "Comment added.");
    } else if (data?.action === "add-comment" && !data.success) {
      const message = data!.message!
        ? data!.message!
        : "There seems to be an error adding your comment. Please try again.";
      addToast(ToastStatus.Error, message);
    }
  }, [addToast, data, data?.action, data?.message, data?.success]);

  return (
    <Form method="post" ref={formRef} className={styles["add-comment-form"]}>
      <input name="parentId" value={parentId} readOnly hidden />
      <input name="submittedBy" value={profile?.id} readOnly hidden />
      <input name="request-type" value="add-comment" hidden readOnly />
      <textarea
        name="content"
        className={styles["comment-input"]}
        placeholder="How does this make you feel?"
        required
      />
      <button type="submit" className={styles["comment-submit-btn"]}>
        {isSubmitting ? <SpinnerCircular size={30} color="white" /> : "Comment"}
      </button>
    </Form>
  );
};

const EmptyCommentsMessage = () => (
  <div id={styles["empty-comments-message"]}>
    <h3>No Comments Yet</h3>
    <Icons type="comment" />
    <p>Be the first to leave a comment!</p>
  </div>
);

const Comment = ({
  commentId,
  commentVoteCount,
  commentContent,
  commentAuthorUrl,
  commentAuthorUsername,
  commentCreationDate,
}: {
  commentId: string;
  commentVoteCount: number;
  commentContent: string;
  commentAuthorUrl: string;
  commentAuthorUsername: string;
  commentCreationDate: string;
}) => (
  <article className={styles.comment}>
    <VoteController
      votesTotal={commentVoteCount}
      parentId={commentId}
      direction="vertical"
      className={styles["comment-votes"]}
    />
    <div className={styles["comment-content"]}>{commentContent}</div>
    <div className={styles["comment-metadata"]}>
      <UserAvatar
        avatarUrl={commentAuthorUrl}
        avatarAlt={commentAuthorUsername}
        className={styles["comment-author"]}
      />
      <span>{commentAuthorUsername}</span>
      <hr />
      <button>
        <Icons type="comment" /> Reply
      </button>
      <p>Posted {findTimeSinceCreated(commentCreationDate)}</p>
    </div>
  </article>
);

const CommentsTreeToolbar = () => (
  <div id={styles["comments-tree-toolbar"]}>
    {/* searchbar and comment sort will go here */}
  </div>
);

export default function CommentsTree({ comments, postId }: CommentsTreeProps) {
  return (
    <section id="comments" className={styles["comments-tree"]}>
      <CommentInputForm parentId={postId} />
      <hr />
      <CommentsTreeToolbar />
      {comments.length ? (
        <div className={styles["comment-list"]}>
          {comments.map((comment) => {
            const { id, votes, content, submittedBy, createdAt } = comment;
            const { username, avatarUrl } = submittedBy as UserProfile;
            return (
              <Comment
                key={id}
                commentId={id}
                commentVoteCount={votes}
                commentContent={content}
                commentAuthorUrl={avatarUrl}
                commentAuthorUsername={username}
                commentCreationDate={createdAt!}
              />
            );
          })}
        </div>
      ) : (
        <EmptyCommentsMessage />
      )}
    </section>
  );
}
