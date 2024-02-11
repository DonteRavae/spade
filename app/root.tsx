// REACT
import { useCallback, useMemo, useState } from "react";
// REMIX
import { cssBundleHref } from "@remix-run/css-bundle";
import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
// INTERNAL
import NavBar from "./components/NavBar/NavBar";
import { parseRequests } from "./utils/db/helpers";
import Searchbar from "./components/Searchbar/Searchbar";
import * as communityHandlers from "./utils/db/community/handlers.server";
import AccountDropdown from "./components/AccountDropdown/AccountDropdown";
import { Favorite, UserProfile, Vote } from "./utils/db/community/types.server";
import ToastStack, {
  ToastData,
  ToastStatus,
} from "./components/ToastStack/ToastStack";
// EXTERNAL
import { ulid } from "ulid";
// STYLES
import styles from "./root.module.css";

export type AppContext = {
  profile: UserProfile | null;
  addToast: (status: ToastStatus, message: string) => void;
  favoritesByUser: Favorite[];
  votesByUser: Vote[];
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const action = async ({ request }: ActionFunctionArgs) => {
  return await parseRequests(request);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // PROFILE
  const profile = await communityHandlers.getCommunityProfile(request, "/");
  const votesByUser = profile
    ? await communityHandlers.getVotesByUser(profile.id)
    : [];

  const favoritesByUser = profile
    ? await communityHandlers.getFavoritesByUser(profile.id)
    : [];

  // SEARCH
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  return json({ profile, query: q, votesByUser, favoritesByUser });
};

export default function App() {
  const { query } = useLoaderData<typeof loader>();
  const { profile, favoritesByUser, votesByUser } =
    useLoaderData<typeof loader>();

  const [stack, setStack] = useState<ToastData[]>([]);

  const removeToast = (id: string) => {
    setStack(stack.filter((toast) => toast.id !== id));
  };

  const addToast = useCallback((status: ToastStatus, message: string) => {
    const data = {
      id: ulid(),
      status,
      message,
    };
    setStack((prev) => [...prev, data]);
  }, []);

  const contextValue: AppContext = useMemo(() => {
    return {
      profile,
      favoritesByUser,
      votesByUser,
      addToast,
    };
  }, [addToast, favoritesByUser, profile, votesByUser]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body id={styles["app-body"]}>
        <header id={styles["app-header"]}>
          <Searchbar value={query} />
          <NavBar />
          {!profile ? (
            <div className={styles.accessLinks}>
              <Link to="/login">Login</Link>
              <hr />
              <Link to="/register">Register</Link>
            </div>
          ) : (
            <AccountDropdown
              avatar={profile.avatarUrl}
              username={profile.username}
            />
          )}
        </header>
        <Outlet context={contextValue} />
        <ToastStack stack={stack} removeFromStack={removeToast} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
