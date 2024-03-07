/* eslint-disable jsx-a11y/media-has-caption */

// REMIX
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/node";
// INTERNAL
import { UserProfile } from "~/utils/lib/types";
import UserAvatar from "~/components/UserAvatar/UserAvatar";
import { parseRequests } from "~/utils/handlers/index.server";
import CommentsTree from "~/containers/CommentsTree/CommentsTree";
import PageContainer from "~/containers/PageContainer/PageContainer";
import VoteController from "~/components/VoteController/VoteController";
import * as communityHandlers from "~/utils/handlers/community.server";
import ShareController from "~/components/ShareController/ShareController";
import FavoriteController from "~/components/FavoriteController/FavoriteController";
import CommentsController from "~/components/CommentsController/CommentsController";
// STYLES
import styles from "./styles/CommunityPost.module.css";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = data?.post.title;
  const user = data?.post.submittedBy as UserProfile;

  return [
    {
      title: `SPADE Mental Health | ${title} by ${user.username}`,
    },
    {
      property: "og:title",
      content: `${title}`,
    },
    {
      property: "og:type",
      content: "article",
    },
    {
      property: "og:url",
      content: "",
    },
    {
      property: "og:description",
      content: "",
    },
    {
      property: "og:image",
      content: "",
    },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return await parseRequests(request);
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const post = await communityHandlers.getPostById(params.postId!);
  const profile = await communityHandlers.getCommunityProfile(request, "/");
  const comments = await communityHandlers.getCommentsByPostId(params.postId!);

  const favoritesByUser = profile
    ? await communityHandlers.getFavoritesByUser(profile.id)
    : [];

  return json({ post, comments, favoritesByUser });
};

export default function CommunityPostPage() {
  const { pathname } = useLocation();
  const { post, comments } = useLoaderData<typeof loader>();
  const {
    id,
    category,
    createdAt,
    title,
    content,
    contentType,
    votes,
    commentsCount,
    submittedBy,
  } = post;
  const { username, avatarUrl } = submittedBy as UserProfile;

  return (
    <PageContainer id={styles["community-post-page"]}>
      <aside id={styles["post-metadata"]}>
        <UserAvatar avatarUrl={avatarUrl} avatarAlt={username} />
        <VoteController
          parentId={id}
          votesTotal={Number(votes)}
          direction="vertical"
        />
        <CommentsController
          direction="vertical"
          commentsCount={commentsCount}
          destination={`${pathname}#comments`}
        />
        <ShareController
          direction="vertical"
          shareTo="facebook"
          urlToShare={pathname}
          redirectTo={pathname}
        />
        <FavoriteController parentId={id} direction="vertical" />
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
      <CommentsTree comments={comments} postId={id} />
    </PageContainer>
  );
}
