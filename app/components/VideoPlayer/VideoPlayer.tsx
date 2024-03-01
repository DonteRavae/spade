// EXTERNAL
import ReactPlayer from 'react-player'
// STYLES
import styles from "./VideoPlayer.module.css";

// @ts-expect-error bundling issue with react-player
const Player = ReactPlayer.default as typeof ReactPlayer;

export default function VideoPlayer({url}: {url: string}) {
  return (
    <div className={styles["video-player"]}>
        <Player url={url} className={styles["react-player"]} width="100%" height="100%" controls />
    </div>
  )
}
