import { Canvas } from "@/components/Canvas/Canvas";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import styles from "@/styles/page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <Sidebar />
      <Canvas />
    </main>
  );
}
