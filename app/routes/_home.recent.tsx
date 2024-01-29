// REMIX
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// INTERNAL
import Forum from "~/components/Forum/Forum";
import * as handlers from "~/utils/db/community/handlers.server";

export const loader = async () => {
  // Retrieve and return 20 most recent posts
  const posts = await handlers.getRecentPosts(20);
  return json({ posts });
};

export default function Recent() {
  const { posts } = useLoaderData<typeof loader>();

  return <Forum posts={posts} />;
}
