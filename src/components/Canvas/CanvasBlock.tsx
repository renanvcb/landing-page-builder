"use client";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Image from "next/image";

import { EditableText } from "../blocks/EditableText";
import canvasStyles from "@/styles/Canvas.module.css";
import blockStyles from "@/styles/Block.module.css";

type DroppedComponent = {
  id: string;
  type: string;
  content?: string;
};

type Props = {
  component: DroppedComponent;
  index: number;
  moveBlock: (from: number, to: number) => void;
  updateContent: (value: string, id: string) => void;
  removeComponent: (id: string) => void;
};

export function CanvasBlock({
  component,
  index,
  moveBlock,
  updateContent,
  removeComponent,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // DRAG
  const [{ isDragging }, drag] = useDrag({
    type: "canvas-block",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // DROP
  const [, drop] = useDrop({
    accept: "canvas-block",
    hover(item: { index: number }) {
      if (!ref.current) return;
      if (item.index === index) return;

      moveBlock(item.index, index);
      item.index = index; // updates index in the moving object
    },
  });

  // Connect drag and drop to the DOM
  drag(drop(ref));

  // Common props for all editable blocks
  const commonProps = {
    content: component.content || "",
    onChange: (val: string) => updateContent(val, component.id),
  };

  return (
    <div
      ref={ref}
      className={canvasStyles.blockWrapper}
      style={{
        opacity: isDragging ? 0.5 : 1,
        display: "flex",
        alignItems: "flex-start",
        gap: "0.5rem",
        cursor: "move",
      }}
    >
      <span className={canvasStyles.dragHandle}>⋮⋮</span>
      {component.type === "Heading" && (
        <EditableText
          as="h1"
          className={blockStyles.heading}
          {...commonProps}
        />
      )}
      {component.type === "Paragraph" && (
        <EditableText
          as="p"
          className={blockStyles.paragraph}
          {...commonProps}
        />
      )}
      {component.type === "Button" && (
        <EditableText
          as="button"
          className={blockStyles.button}
          {...commonProps}
        />
      )}
      {component.type === "Image" && (
        <div>
          <input
            type="text"
            value={component.content}
            onChange={(e) => updateContent(e.target.value, component.id)}
            placeholder="Image URL"
            className={blockStyles.editInput}
          />
          <Image
            src={component.content || ""}
            alt="User image"
            className={blockStyles.image}
            width={500}
            height={300}
            priority
          />
        </div>
      )}

      <button
        onClick={() => removeComponent(component.id)}
        className={canvasStyles.removeBtn}
      >
        ×
      </button>
    </div>
  );
}
