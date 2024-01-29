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
import { isSessionValid } from "./utils/db/auth/auth.server";
import NavBar from "./components/NavBar/NavBar";
import Searchbar from "./components/Searchbar/Searchbar";
import { UserProfile } from "./utils/db/community/types.server";
import * as handlers from "./utils/db/community/handlers.server";
import AccountDropdown from "./components/AccountDropdown/AccountDropdown";
// STYLES
import styles from "./root.module.css";

export type AuthContext = {
  profile: UserProfile | null;
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const requestType = formData.get("request-type");
  if (requestType === "create-post") {
    return await handlers.createPost(formData);
  }
  return null;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { decodedClaims, success } = await isSessionValid(request, "/");

  // PROFILE
  let profile = null;
  if (success)
    profile = await handlers.getCommunityProfileById(decodedClaims!.uid);

  // SEARCH
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  return json({ profile, query: q });
};

export default function App() {
  const { query } = useLoaderData<typeof loader>();
  let { profile } = useLoaderData<typeof loader>();
  profile = profile ? (profile as UserProfile) : null;

  const contextValue: AuthContext = {
    profile,
  };

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
              avatar={profile!.avatarUrl}
              username={profile?.username}
            />
          )}
        </header>
        <Outlet context={contextValue} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
