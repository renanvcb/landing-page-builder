"use client";

import styles from "@/styles/Sidebar.module.css";
import { DraggableBlock } from "@/components/blocks/DraggableBlock";

const COMPONENTS = ["Heading", "Paragraph", "Image", "Button"];

export function Sidebar() {
  return (
    <nav
      className={styles.sidebar}
      role="complementary"
      aria-label="Component library"
    >
      <h2 className={styles.title}>Components</h2>
      {COMPONENTS.map((type) => (
        <DraggableBlock key={type} type={type} />
      ))}
    </nav>
  );
}
