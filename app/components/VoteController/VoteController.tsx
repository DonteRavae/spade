// REACT
import { useState, useEffect } from "react";
// REMIX
import { useFetcher, useOutletContext } from "@remix-run/react";
// INTERNAL
import Icons from "../Icons";
import { AppContext } from "~/root";
import { ToastStatus } from "../ToastStack/ToastStack";
import { Vote } from "~/utils/db/community/types.server";
// STYLES
import styles from "./VoteController.module.css";

export default function VoteController({
  votesTotal,
  parentId,
  direction,
  theme,
}: {
  theme: "light" | "dark";
  votesTotal: number;
  parentId: string;
  direction: "horizontal" | "vertical";
}) {
  const { Form, submit, formData } = useFetcher();
  const { profile, votesByUser, addToast } = useOutletContext<AppContext>();
  const [previousVote, setPreviousVote] = useState<Vote | undefined>(
    votesByUser.find((vote) => vote.parentId === parentId)
  );
  const [vote, setVote] = useState<number>(
    previousVote ? previousVote.vote : 0
  );

  // Optimistically load vote total
  const voteTotal = formData
    ? Number(votesTotal) + Number(formData.get("vote"))
    : votesTotal;

  useEffect(() => {
    const doesVoteExist = (votesByUser: Vote[], parentId: string) =>
      votesByUser.find((vote) => vote.parentId === parentId);
    setPreviousVote(doesVoteExist(votesByUser, parentId));
  }, [parentId, previousVote, vote, votesByUser, votesTotal]);

  const handleSubmission = (vote: number) => {
    // User must be signed in to vote. If not, alert the user and return.
    if (!profile)
      return addToast(ToastStatus.Information, "You must sign in to vote.");

    try {
      !previousVote
        ? submit(
            {
              parentId,
              vote,
              voter: profile.id,
              "request-type": "new-vote",
            },
            { method: "post" }
          )
        : submit(
            {
              voteId: previousVote.id,
              vote,
              "request-type": "update-vote",
            },
            { method: "post" }
          );
    } catch (error) {
      console.error(error); // TODO: Log Error
      addToast(
        ToastStatus.Error,
        "There seems to be an error. Please try again."
      );
    }
  };

  const handleUpvote = () => {
    if (vote !== 0) {
      setVote(0);
      handleSubmission(0);
    } else {
      setVote(1);
      handleSubmission(1);
    }
  };

  const handleDownvote = () => {
    if (vote !== 0) {
      setVote(0);
      handleSubmission(0);
    } else {
      setVote(-1);
      handleSubmission(-1);
    }
  };

  return (
    <section
      className={`${styles["vote-controller"]} ${styles[`${direction}`]} ${
        styles[`${theme}`]
      }`}
    >
      <Form className={styles["vote-form"]} method="post">
        <button type="button" onClick={handleUpvote} aria-label="Upvote">
          <Icons
            type="caret-up"
            className={vote === 1 ? styles.selected : ""}
          />
        </button>
      </Form>
      <p className={styles["vote-total"]}>{voteTotal}</p>
      <Form className={styles["vote-form"]} method="post">
        <button type="button" onClick={handleDownvote} aria-label="Downvote">
          <Icons
            type="caret-down"
            className={vote === -1 ? styles.selected : ""}
          />
        </button>
      </Form>
    </section>
  );
}
