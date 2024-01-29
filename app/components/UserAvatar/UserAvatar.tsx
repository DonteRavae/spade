// STYLES
import styles from "./UserAvatar.module.css";

export default function UserAvatar({
  id,
  avatarUrl,
  avatarAlt,
}: {
  id?: string;
  avatarUrl: string;
  avatarAlt: string;
}) {
  return (
    <img id={id} src={avatarUrl} alt={avatarAlt} className={styles.avatar} />
  );
}
