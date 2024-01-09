// REMIX
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "SPADE Mental Health | Community" },
    { name: "description", content: "Connect with others!" },
  ];
};

export default function Community() {
  return (
    <main>
      <h1>SPADE Community</h1>
    </main>
  );
}
