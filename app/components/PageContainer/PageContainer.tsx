// REACT
import { ReactNode } from "react";
// STYLES
import styles from "./PageContainer.module.css";

export default function PageContainer({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  return (
    <main id={id} className={styles["page-container"]}>
      {children}
    </main>
  );
}
