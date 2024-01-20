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
import Searchbar from "./components/Searchbar/Searchbar";
import AccountDropdown from "./components/AccountDropdown/AccountDropdown";
// STYLES
import styles from "./root.module.css";
import {
  Profile,
  isSessionValid,
  retrieveProfile,
  signOutUser,
} from "./utils/db/auth/auth.server";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  if (formData.get("logout-user")) {
    return await signOutUser(request);
  }
  return null;
};

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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
