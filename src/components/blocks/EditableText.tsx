"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/Block.module.css";

type EditableTextProps = {
  content: string;
  onChange: (value: string) => void;
  className?: string;
  as?: "h1" | "p" | "button";
};

export function EditableText({
  content,
  onChange,
  className = "",
  as = "p",
}: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(content);

  // Synchronizes when props.content changes
  useEffect(() => {
    setValue(content);
  }, [content]);

  const handleBlur = () => {
    setEditing(false);
    onChange(value);
  };

  if (editing) {
    return (
      <input
        autoFocus
        className={`${styles.editInput} ${className}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleBlur();
          }
        }}
      />
    );
  }

  const Element = as;

  return (
    <Element
      className={className}
      onClick={() => setEditing(true)}
      style={{ cursor: "text" }}
    >
      {value}
    </Element>
  );
}
