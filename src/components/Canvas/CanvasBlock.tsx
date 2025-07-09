"use client";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Image from "next/image";

import { EditableText } from "../blocks/EditableText";

import canvasStyles from "@/styles/Canvas.module.css";
import blockStyles from "@/styles/Block.module.css";

import { DroppedComponent } from "@/types/types";

type CanvasBlockProps = {
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
}: CanvasBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { settings = {} } = component;

  // Styles for the wrapper (background, layout)
  const wrapperStyle: React.CSSProperties = {
    ...(settings.bgColor ? { backgroundColor: settings.bgColor } : {}),
  };

  // Styles for content elements (text, colors, alignment)
  const contentStyle: React.CSSProperties = {
    ...(settings.textColor ? { color: settings.textColor } : {}),
    ...(settings.fontSize ? { fontSize: settings.fontSize } : {}),
    ...(settings.textAlign ? { textAlign: settings.textAlign } : {}),
    ...(settings.btnBgColor ? { backgroundColor: settings.btnBgColor } : {}),
  };

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
    hover(item: CanvasBlockProps) {
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
      onClick={(e) => {
        e.stopPropagation(); // Prevent click from bubbling up to the canvas
        onSelect();
      }}
      className={`${canvasStyles.blockWrapper} ${
        selected && canvasStyles.selected
      } ${isOver && canvasStyles.hoverTarget} ${
        isDragging && canvasStyles.dragging
      }`}
      style={wrapperStyle}
    >
      <span className={canvasStyles.dragHandle}>⋮⋮</span>

      {component.type === "Heading" && (
        <EditableText
          as="h1"
          className={blockStyles.heading}
          style={contentStyle}
          {...commonProps}
        />
      )}

      {component.type === "Paragraph" && (
        <EditableText
          as="p"
          className={blockStyles.paragraph}
          style={contentStyle}
          {...commonProps}
        />
      )}

      {component.type === "Button" && (
        <EditableText
          as="button"
          className={blockStyles.button}
          style={contentStyle}
          {...commonProps}
        />
      )}

      {component.type === "Image" && (
        <div className={blockStyles.imageContainer}>
          <Image
            src={component.content || ""}
            alt={settings.alt || "User image"}
            className={blockStyles.image}
            width={settings.width || 500}
            height={settings.height || 300}
            priority
            style={{ width: "100%", height: "auto" }}
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
