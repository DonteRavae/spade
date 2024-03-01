// REACT
import { ChangeEventHandler, useEffect, useRef } from "react";
// REMIX
import { Form, useNavigation } from "@remix-run/react";
// INTERNAL
import { useApp } from "~/providers/AppProvider";
// STYLES
import styles from "./CreatePostForm.module.css";

export default function CreatePostForm() {
  const { profile } = useApp();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const resizeTitle: ChangeEventHandler = (event) => {
    const scrollHeight = event.currentTarget.scrollHeight;
    titleRef.current!.style.height = `${scrollHeight}px`;
  };

  useEffect(() => {
    if (navigation.state === "loading") formRef.current?.reset();
  }, [navigation]);

  return (
    <Form id={styles["create-post-form"]} method="post" ref={formRef}>
      <textarea
        ref={titleRef}
        id={styles["post-title-input"]}
        className={styles["post-input"]}
        name="post-title"
        placeholder="Title"
        required
        maxLength={300}
        onChange={resizeTitle}
      />
      <textarea
        id={styles["post-content"]}
        className={styles["post-input"]}
        placeholder="What's on your mind?"
        name="post-content"
      />
      <select className={styles["topic-selection"]} name="category" required>
        <option value="">--Please choose a topic--</option>
        <option value="suicide">Suicide</option>
        <option value="ptsd">PTSD</option>
        <option value="anxiety">Anxiety</option>
        <option value="depression">Depression</option>
        <option value="epilepsy">Epilepsy</option>
      </select>

      <hr className={styles.divider} />

      <div className={styles["action-btns"]}>
        <button className={styles["reset-btn"]} type="reset">
          Reset
        </button>
        <button className={styles["submit-btn"]} type="submit">
          Post
        </button>
      </div>

      <input name="submitted-by" value={profile!.username} readOnly hidden />
      <input name="request-type" value="create-post" hidden />
    </Form>
  );
}
