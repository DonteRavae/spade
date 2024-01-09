// REMIX
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
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

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  return json({ query: q });
};

export default function App() {
  const { query } = useLoaderData<typeof loader>();

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
          <AccountDropdown />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
