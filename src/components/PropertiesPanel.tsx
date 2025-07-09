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
    <aside
      className={styles.panel}
      role="complementary"
      aria-label="Component properties panel"
    >
      <header className={styles.panelHeader}>
        <h3 className={styles.title}>Properties</h3>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close properties panel"
          type="button"
        >
          ×
        </button>
      </header>

      <form onSubmit={(e) => e.preventDefault()}>
        {(type === "Heading" || type === "Paragraph" || type === "Button") && (
          <fieldset>
            <legend className="sr-only">Text content and styling</legend>

            <label htmlFor="text-input" className={styles.label}>
              Text
            </label>
            <input
              id="text-input"
              type="text"
              value={content}
              onChange={(e) => update(e.target.value)}
              className={styles.input}
            />

            <label htmlFor="text-color" className={styles.label}>
              Text Color
            </label>
            <input
              id="text-color"
              type="color"
              name="textColor"
              value={settings.textColor || "#000000"}
              onChange={handleChange}
              className={styles.input}
            />

            <label htmlFor="bg-color" className={styles.label}>
              Background Color
            </label>
            <input
              id="bg-color"
              type="color"
              name="bgColor"
              value={settings.bgColor || "transparent"}
              onChange={handleChange}
              className={styles.input}
            />

            <label htmlFor="font-size" className={styles.label}>
              Font Size
            </label>
            <input
              id="font-size"
              type="text"
              name="fontSize"
              placeholder="Ex: 16px, 1.5rem"
              value={settings.fontSize || ""}
              onChange={handleChange}
              className={styles.input}
            />

            <label htmlFor="text-align" className={styles.label}>
              Text Align
            </label>
            <select
              id="text-align"
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
                <label htmlFor="button-url" className={styles.label}>
                  URL
                </label>
                <input
                  id="button-url"
                  type="url"
                  name="url"
                  value={settings.url || ""}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="https://example.com"
                />

                <label htmlFor="button-bg-color" className={styles.label}>
                  Button Background Color
                </label>
                <input
                  id="button-bg-color"
                  type="color"
                  name="btnBgColor"
                  value={settings.btnBgColor || "#0070f3"}
                  onChange={handleChange}
                  className={styles.input}
                />
              </>
            )}
          </fieldset>
        )}

        {type === "Image" && (
          <fieldset>
            <legend className="sr-only">Image properties</legend>

            <label htmlFor="image-url" className={styles.label}>
              Image URL
            </label>
            <input
              id="image-url"
              type="url"
              value={content}
              onChange={(e) => update(e.target.value)}
              className={styles.input}
              placeholder="https://example.com/image.jpg"
            />

            <label htmlFor="alt-text" className={styles.label}>
              Alt Text
            </label>
            <input
              id="alt-text"
              type="text"
              name="alt"
              value={settings.alt || ""}
              onChange={handleChange}
              className={styles.input}
              placeholder="Describe the image"
            />

            <label htmlFor="max-width" className={styles.label}>
              Max Width (CSS)
            </label>
            <input
              id="max-width"
              type="text"
              name="maxWidth"
              placeholder="Ex: 100%, 500px, 50vw"
              value={settings.maxWidth || "100%"}
              onChange={handleChange}
              className={styles.input}
            />

            <label htmlFor="max-height" className={styles.label}>
              Max Height (CSS)
            </label>
            <input
              id="max-height"
              type="text"
              name="maxHeight"
              placeholder="Ex: 400px, 50vh, auto"
              value={settings.maxHeight || "500px"}
              onChange={handleChange}
              className={styles.input}
            />
          </fieldset>
        )}
      </form>
    </aside>
  );
}
