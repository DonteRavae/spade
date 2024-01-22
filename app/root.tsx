// REMIX
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
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
import {
  Profile,
  isSessionValid,
  retrieveProfile,
} from "./utils/db/auth/auth.server";
import NavBar from "./components/NavBar/NavBar";
import Searchbar from "./components/Searchbar/Searchbar";
import AccountDropdown from "./components/AccountDropdown/AccountDropdown";
// STYLES
import styles from "./root.module.css";

export type AuthContext = {
  profile: Profile | null;
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { decodedClaims, success } = await isSessionValid(request, "/");

  // PROFILE
  let profile = null;
  if (success) profile = await retrieveProfile(decodedClaims!.uid);

  // SEARCH
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  return json({ profile, query: q });
};

export default function App() {
  const { query } = useLoaderData<typeof loader>();
  let { profile } = useLoaderData<typeof loader>();
  profile = profile ? (profile as Profile) : null;

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
              avatar={profile!.avatar}
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
