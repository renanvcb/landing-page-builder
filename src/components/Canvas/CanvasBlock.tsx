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
  selected: boolean;
  onSelect: () => void;
};

export function CanvasBlock({
  component,
  index,
  moveBlock,
  updateContent,
  removeComponent,
  selected,
  onSelect,
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
  const [{ isOver }, drop] = useDrop({
    accept: "canvas-block",
    hover(item: Props) {
      if (!ref.current || item.index === index) return;
      moveBlock(item.index, index);
      item.index = index;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
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
      onClick={onSelect}
      className={`${canvasStyles.blockWrapper} ${
        selected && canvasStyles.selected
      } ${isOver && canvasStyles.hoverTarget} ${
        isDragging && canvasStyles.dragging
      }`}
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
        <div className={blockStyles.imageContainer}>
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
            width={600}
            height={300}
            priority
            objectFit="contain"
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
