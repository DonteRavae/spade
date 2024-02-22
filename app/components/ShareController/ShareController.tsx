// REMIX
import { Link } from "@remix-run/react";
// INTERNAL
import Icons from "../Icons";
// STYLES
import styles from "./ShareController.module.css";

const FACEBOOK_APP_ID = 907102857789784;

export default function ShareController({
  direction,
  shareTo,
  urlToShare,
  redirectTo,
  noText,
}: {
  direction: "horizontal" | "vertical";
  urlToShare?: string;
  redirectTo?: string;
  shareTo?: "facebook" | "twitter" | "instagram";
  noText?: boolean;
}) {
  const facebookShareUrl = encodeURI(
    `https://www.facebook.com/dialog/share?app_id=${FACEBOOK_APP_ID}&display=page&href=https://spadementalhealth.com/${urlToShare}&redirect_uri=https://spadementalheath.com/${redirectTo}`
  );
  return (
    <section className={styles["share-controller"]}>
      <Link
        to={shareTo === "facebook" ? facebookShareUrl : ""}
        className={styles[`${direction}`]}
      >
        <Icons type="share" />
        {!noText && <p>Share</p>}
      </Link>
    </section>
  );
}
