// INTERNAL
import Icons from "../Icons";
// STYLES
import styles from "./ToastStack.module.css";

export type ToastData = {
  id?: string;
  status: ToastStatus;
  message: string;
};

type ToastProps = {
  status: ToastStatus;
  message: string;
  removeFromStack: () => void;
};

export enum ToastStatus {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Information = "information",
}

export const Toast = ({ status, message, removeFromStack }: ToastProps) => (
  <li className={styles.toast}>
    <Icons type={status} className={styles["status-icon"]} />
    <p>{message}</p>
    <button className={styles["close-btn"]} onClick={removeFromStack}>
      <Icons type="close" className={styles["close-icon"]} />
    </button>
  </li>
);

export default function ToastStack({
  stack,
  removeFromStack,
}: {
  stack: ToastData[];
  removeFromStack: (id: string) => void;
}) {
  return (
    <ul id={styles["toast-stack"]}>
      {stack.length
        ? stack.map((toast) => (
            <Toast
              key={toast.id}
              status={toast.status}
              message={toast.message}
              removeFromStack={() => removeFromStack(toast.id!)}
            />
          ))
        : null}
    </ul>
  );
}
