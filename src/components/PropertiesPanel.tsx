"use client";

import styles from "@/styles/PropertiesPanel.module.css";

type Props = {
  type: string;
  content: string;
  update: (value: string) => void;
};

export function PropertiesPanel({ type, content, update }: Props) {
  return (
    <div className={styles.panel}>
      <h3 className={styles.panelTitle}>Properties</h3>

      {(type === "Heading" || type === "Paragraph" || type === "Button") && (
        <>
          <label className={styles.label}>Text</label>
          <input
            type="text"
            value={content}
            onChange={(e) => update(e.target.value)}
            className={styles.input}
          />
        </>
      )}

      {type === "Image" && (
        <>
          <label className={styles.label}>Image (URL)</label>
          <input
            type="text"
            value={content}
            onChange={(e) => update(e.target.value)}
            className={styles.input}
          />
        </>
      )}
    </div>
  );
}
