// STYLES
import styles from "./UserAvatar.module.css";

export default function UserAvatar({
  id,
  avatarUrl,
  avatarAlt,
  className,
}: {
  id?: string;
  avatarUrl: string;
  avatarAlt: string;
  className?: string;
}) {
  return (
    <img
      id={id}
      src={avatarUrl}
      alt={avatarAlt}
      className={`${styles.avatar} ${className}`}
    />
  );
}
