"use client";

import { useDrop } from "react-dnd";
import { useRef, useState, useEffect } from "react";

import canvasStyles from "@/styles/Canvas.module.css";
import { CanvasBlock } from "./CanvasBlock";

type DroppedComponent = {
  id: string;
  type: string;
  content?: string;
};

let idCounter = 0;

export function Canvas() {
  const [components, setComponents] = useState<DroppedComponent[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // Loads from localStorage on start
  useEffect(() => {
    const stored = localStorage.getItem("pageComponents");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as DroppedComponent[];
        setComponents(parsed);
        idCounter = parsed.length;
      } catch (err) {
        console.error("Erro ao carregar dados salvos:", err);
      }
    }
  }, []);

  // Saves to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pageComponents", JSON.stringify(components));
  }, [components]);

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

  const updateContent = (newContent: string, id: string) => {
    setComponents((prev) =>
      prev.map((component) =>
        component.id === id ? { ...component, content: newContent } : component
      )
    );
  };

  const removeComponent = (id: string) => {
    setComponents((prev) => prev.filter((component) => component.id !== id));
  };

  const moveBlock = (dragIndex: number, hoverIndex: number) => {
    setComponents((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, removed);
      return updated;
    });
  };

  return (
    <div
      ref={ref}
      className={canvasStyles.canvas}
      style={{ backgroundColor: isOver ? "#f0f8ff" : "white" }}
    >
      {components.map((component, index) => (
        <CanvasBlock
          key={component.id}
          index={index}
          component={component}
          moveBlock={moveBlock}
          updateContent={updateContent}
          removeComponent={removeComponent}
        />
      ))}
    </div>
  );
}
