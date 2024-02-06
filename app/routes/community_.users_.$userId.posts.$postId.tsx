/* eslint-disable jsx-a11y/media-has-caption */

// REMIX
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
// INTERNAL
import Icons from "~/components/Icons";
import { parseRequests } from "~/utils/helpers";
import UserAvatar from "~/components/UserAvatar/UserAvatar";
import { UserProfile } from "~/utils/db/community/types.server";
import CommentsTree from "~/components/CommentsTree/CommentsTree";
import PageContainer from "~/components/PageContainer/PageContainer";
import VoteController from "~/components/VoteController/VoteController";
import * as communityHandlers from "~/utils/db/community/handlers.server";
import FavoriteController from "~/components/FavoriteController/FavoriteController";
import CommentsController from "~/components/CommentsController/CommentsController";
// STYLES
import styles from "./styles/CommunityPost.module.css";

export const action = async ({ request }: ActionFunctionArgs) => {
  return await parseRequests(request);
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const post = await communityHandlers.getPostById(params.postId!);
  const profile = await communityHandlers.getCommunityProfile(request, "/");

  const votesByUser = profile
    ? await communityHandlers.getVotesByUser(profile.id)
    : [];

  const favoritesByUser = profile
    ? await communityHandlers.getFavoritesByUser(profile.id)
    : [];

  return json({ post, votesByUser, favoritesByUser });
};

export default function CommunityPostPage() {
  const { pathname } = useLocation();
  const { post } = useLoaderData<typeof loader>();
  const {
    id,
    category,
    createdAt,
    title,
    content,
    contentType,
    votes,
    comments,
    submittedBy,
  } = post;
  const { username, avatarUrl } = submittedBy as UserProfile;

  return (
    <PageContainer id={styles["community-post-page"]}>
      <aside id={styles["post-metadata"]}>
        <UserAvatar avatarUrl={avatarUrl} avatarAlt={username} />
        <VoteController
          theme="dark"
          parentId={id}
          votesTotal={votes}
          direction="vertical"
        />
        <CommentsController
          theme="dark"
          direction="vertical"
          commentsCount={comments}
          destination={`${pathname}#comments`}
        />
        {/* share */}
        <section className={styles["metadata-section"]}>
          <Icons type="share" />
          <p>Share</p>
        </section>
        <FavoriteController parentId={id} direction="vertical" theme="dark" />
      </aside>
      <section id={styles.post}>
        <p id={styles["post-timestamp"]}>
          Posted to{" "}
          <Link to={`/community/${category}`} id={styles["post-category"]}>
            {category}
          </Link>{" "}
          on {/* <span> */}
          {new Date(createdAt!).toLocaleDateString("en-us", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          {/* </span> */}
        </p>
        <h3 id={styles["post-title"]}>{title}</h3>
        {/* list of badges */}
        {/* content */}
        {contentType === "text" && content ? (
          <p className={styles.content}>{content}</p>
        ) : contentType === "image" && content ? (
          <img className={styles.content} src="" alt="Post Content" />
        ) : contentType === "video" && content ? (
          <video className={styles.content} src="" />
        ) : null}
      </section>
      <CommentsTree comments={[]} />
    </PageContainer>
  );
}
