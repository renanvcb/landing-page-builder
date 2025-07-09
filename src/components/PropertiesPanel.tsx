"use client";

import styles from "@/styles/PropertiesPanel.module.css";

type PanelProps = {
  type: string;
  content: string;
  update: (value: string) => void;
  onClose: () => void;
};

export function PropertiesPanel({
  type,
  content,
  update,
  onClose,
}: PanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h3 className={styles.title}>Properties</h3>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
      </div>

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
