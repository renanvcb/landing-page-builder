"use client";

import styles from "@/styles/PropertiesPanel.module.css";
import { DroppedComponent } from "@/types/types";

type PanelProps = {
  type: string;
  content: string;
  settings: DroppedComponent["settings"];
  update: (value: string) => void;
  updateSettings: (newSettings: Partial<DroppedComponent["settings"]>) => void;
  onClose: () => void;
};

export function PropertiesPanel({
  type,
  content,
  settings = {},
  update,
  updateSettings,
  onClose,
}: PanelProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateSettings({ ...settings, [name]: value });
  };
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

          <label className={styles.label}>Text Color</label>
          <input
            type="color"
            name="textColor"
            value={settings.textColor || "#000000"}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Background Color</label>
          <input
            type="color"
            name="bgColor"
            value={settings.bgColor || "transparent"}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Font Size</label>
          <input
            type="text"
            name="fontSize"
            placeholder="Ex: 16px, 1.5rem"
            value={settings.fontSize || ""}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Text Align</label>
          <select
            name="textAlign"
            value={settings.textAlign || "left"}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>

          {type === "Button" && (
            <>
              <label className={styles.label}>URL</label>
              <input
                type="text"
                name="url"
                value={settings.url || ""}
                onChange={handleChange}
                className={styles.input}
              />

              <label className={styles.label}>Button Background Color</label>
              <input
                type="color"
                name="btnBgColor"
                value={settings.btnBgColor || "#0070f3"}
                onChange={handleChange}
                className={styles.input}
              />
            </>
          )}
        </>
      )}

      {type === "Image" && (
        <>
          <label className={styles.label}>Image URL</label>
          <input
            type="text"
            value={content}
            onChange={(e) => update(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label}>Alt Text</label>
          <input
            type="text"
            name="alt"
            value={settings.alt || ""}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Width</label>
          <input
            type="number"
            name="width"
            value={settings.width || 500}
            onChange={(e) => updateSettings({ width: Number(e.target.value) })}
            className={styles.input}
          />

          <label className={styles.label}>Height</label>
          <input
            type="number"
            name="height"
            value={settings.height || 300}
            onChange={(e) => updateSettings({ height: Number(e.target.value) })}
            className={styles.input}
          />
        </>
      )}
    </div>
  );
}
