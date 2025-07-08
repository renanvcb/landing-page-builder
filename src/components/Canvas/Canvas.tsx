"use client";

import { useDrop } from "react-dnd";
import { useRef, useState } from "react";
import Image from "next/image";

import { EditableText } from "../blocks/EditableText";

import canvasStyles from "@/styles/Canvas.module.css";
import blockStyles from "@/styles/Block.module.css";

type DroppedComponent = {
  id: string;
  type: string;
  content?: string; // Optional content for blocks like Paragraph or Heading
};

let idCounter = 0;

export function Canvas() {
  const [components, setComponents] = useState<DroppedComponent[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop({
    accept: "block",
    drop: (item: { type: string }) => {
      const defaultContentMap: Record<string, string> = {
        Heading: "Editable Heading",
        Paragraph: "Editable paragraph text...",
        Image: "https://picsum.photos/300/150",
        Button: "Click Me",
      };

      const newComponent: DroppedComponent = {
        id: `comp-${idCounter++}`,
        type: item.type,
        content: defaultContentMap[item.type] || "",
      };

      setComponents((prev) => [...prev, newComponent]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(ref);

  return (
    <div
      ref={ref}
      className={canvasStyles.canvas}
      style={{ backgroundColor: isOver ? "#f0f8ff" : "white" }}
    >
      {components.map((component) => {
        const updateContent = (newContent: string) => {
          setComponents((prev) =>
            prev.map((c) =>
              c.id === component.id ? { ...c, content: newContent } : c
            )
          );
        };

        const removeComponent = () => {
          setComponents((prev) => prev.filter((c) => c.id !== component.id));
        };

        switch (component.type) {
          case "Heading":
            return (
              <div key={component.id} className={canvasStyles.blockWrapper}>
                <EditableText
                  as="h1"
                  content={component.content || ""}
                  onChange={updateContent}
                  className={blockStyles.heading}
                />
                <button
                  onClick={removeComponent}
                  className={canvasStyles.removeBtn}
                >
                  ×
                </button>
              </div>
            );
          case "Paragraph":
            return (
              <div key={component.id} className={canvasStyles.blockWrapper}>
                <EditableText
                  as="p"
                  content={component.content || ""}
                  onChange={updateContent}
                  className={blockStyles.paragraph}
                />
                <button
                  onClick={removeComponent}
                  className={canvasStyles.removeBtn}
                >
                  ×
                </button>
              </div>
            );
          case "Button":
            return (
              <div key={component.id} className={canvasStyles.blockWrapper}>
                <EditableText
                  as="button"
                  content={component.content || ""}
                  onChange={updateContent}
                  className={blockStyles.button}
                />
                <button
                  onClick={removeComponent}
                  className={canvasStyles.removeBtn}
                >
                  ×
                </button>
              </div>
            );
          case "Image":
            return (
              <div key={component.id} className={canvasStyles.blockWrapper}>
                <input
                  type="text"
                  value={component.content}
                  onChange={(e) => updateContent(e.target.value)}
                  placeholder="Image URL"
                  className={blockStyles.editInput}
                />
                <Image
                  src={component.content || ""}
                  alt="User image"
                  className={blockStyles.image}
                  width={500}
                  height={300}
                />
                <button
                  onClick={removeComponent}
                  className={canvasStyles.removeBtn}
                >
                  ×
                </button>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
