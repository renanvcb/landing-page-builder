import { Sidebar } from "@/components/Sidebar/Sidebar";
import styles from "@/styles/page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Sidebar />
      {/* <Canvas /> */}
    </div>
  );
}
