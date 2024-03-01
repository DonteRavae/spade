/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// REACT
import { ReactNode, forwardRef, useImperativeHandle, useState } from "react";
// INTERNAL
import Icons from "../Icons";
// STYLES
import styles from "./Modal.module.css";

export type ModalRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  children: ReactNode;
  label: string;
};

const Modal = forwardRef<ModalRef, Props>(({ children, label }, ref) => {
  const [isModalVisible, toggleModalVisibility] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    open() {
      toggleModalVisibility(true);
    },
    close() {
      toggleModalVisibility(false);
    },
  }));

  const closeModal = () => toggleModalVisibility(false);

  return (
    <>
      <div
        className={`${styles.overlay} ${
          isModalVisible ? styles["show-modal"] : ""
        }`}
        onClick={closeModal}
      />

      <section
        className={`${styles.modal} ${
          isModalVisible ? styles["show-modal"] : ""
        }`}
      >
        <header>
          <h2>{label}</h2>
          <button
            className={styles["close-btn"]}
            type="button"
            onClick={closeModal}
          >
            <Icons type="close" />
          </button>
        </header>

        <hr className={styles.divider} />

        {children}
      </section>
    </>
  );
});

Modal.displayName = "Modal";

export default Modal;
