"use client";

import { useDrop } from "react-dnd";
import { useRef, useState, useEffect } from "react";

import canvasStyles from "@/styles/Canvas.module.css";

import { CanvasBlock } from "./CanvasBlock";
import { PropertiesPanel } from "../PropertiesPanel";

type DroppedComponent = {
  id: string;
  type: string;
  content?: string;
};

let idCounter = 0;

export function Canvas() {
  const [components, setComponents] = useState<DroppedComponent[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedComponent = components.find((c) => c.id === selectedId);

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
        Image: "https://picsum.photos/800/300",
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
    <div className={canvasStyles.container}>
      <div
        ref={ref}
        className={canvasStyles.canvas}
        style={{ backgroundColor: isOver ? "#f0f8ff" : "white" }}
        onClick={() => setSelectedId(null)}
      >
        {components.map((component, index) => (
          <CanvasBlock
            key={component.id}
            index={index}
            component={component}
            moveBlock={moveBlock}
            updateContent={(val) => updateContent(val, component.id)}
            removeComponent={(id) => removeComponent(id)}
            selected={selectedId === component.id}
            onSelect={() => setSelectedId(component.id)}
          />
        ))}
      </div>

      {selectedComponent && (
        <PropertiesPanel
          type={selectedComponent.type}
          content={selectedComponent.content || ""}
          update={(val) => updateContent(val, selectedComponent.id)}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
