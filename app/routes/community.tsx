// REMIX
import type { MetaFunction } from "@remix-run/node";
// INTERNAL
import PageContainer from "~/components/PageContainer/PageContainer";
// STYLES
import styles from "./styles/Community.module.css";

export const meta: MetaFunction = () => {
  return [
    { title: "SPADE Mental Health | Community" },
    { name: "description", content: "Connect with others!" },
  ];
};

export default function Community() {
  return (
    <PageContainer id={styles["community-page"]}>
      <h1>SPADE Community</h1>
    </PageContainer>
  );
}
