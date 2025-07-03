"use client";

import { useRef } from "react";
import { useDrag } from "react-dnd";

import styles from "@/styles/DraggableBlock.module.css";

type BlockProps = {
  type: string;
};

export function DraggableBlock({ type }: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: "block",
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref); // conecta o ref ao react-dnd

  return (
    <div
      ref={ref}
      className={styles.block}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <p>{type}</p>
    </div>
  );
}
