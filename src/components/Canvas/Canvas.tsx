"use client";

import { useDrop } from "react-dnd";
import styles from "@/styles/Canvas.module.css";
import { useRef, useState } from "react";
import { HeadingBlock } from "@/components/blocks/HeadingBlock";
import { ParagraphBlock } from "@/components/blocks/ParagraphBlock";
import { ImageBlock } from "@/components/blocks/ImageBlock";
import { ButtonBlock } from "@/components/blocks/ButtonBlock";

type DroppedComponent = {
  id: string;
  type: string;
};

let idCounter = 0;

export function Canvas() {
  const [components, setComponents] = useState<DroppedComponent[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop({
    accept: "block",
    drop: (item: { type: string }) => {
      const newComponent: DroppedComponent = {
        id: `comp-${idCounter++}`,
        type: item.type,
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
      className={styles.canvas}
      style={{ backgroundColor: isOver ? "#f0f8ff" : "white" }}
    >
      {components.map((component) => {
        switch (component.type) {
          case "Heading":
            return <HeadingBlock key={component.id} />;
          case "Paragraph":
            return <ParagraphBlock key={component.id} />;
          case "Image":
            return <ImageBlock key={component.id} />;
          case "Button":
            return <ButtonBlock key={component.id} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
