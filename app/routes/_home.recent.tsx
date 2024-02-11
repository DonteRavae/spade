// REMIX
import { useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, json } from "@remix-run/node";
// INTERNAL
import Forum from "~/components/Forum/Forum";
import { parseRequests } from "~/utils/db/helpers";
import * as handlers from "~/utils/db/community/handlers.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  return await parseRequests(request);
};

export const loader = async () => {
  // Retrieve and return 20 most recent posts
  const posts = await handlers.getRecentPosts(20);
  return json({ posts });
};

export default function Recent() {
  const { posts } = useLoaderData<typeof loader>();

  return <Forum posts={posts} />;
}
