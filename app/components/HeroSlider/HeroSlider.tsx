// STYLES
import styles from "./HeroSlider.module.css";

function HeroSliderItem() {
  return (
    <li className={styles["hero-slider-item"]}>
      <img src="/assets/signupImg.png" alt="" />
    </li>
  );
}

export default function HeroSlider({
  toggleSlider,
}: {
  toggleSlider: boolean;
}) {
  return (
    <ul
      id={styles["hero-slider"]}
      className={!toggleSlider ? styles.close : ""}
    >
      <HeroSliderItem />
    </ul>
  );
}
