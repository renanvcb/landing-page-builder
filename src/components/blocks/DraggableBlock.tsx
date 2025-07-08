"use client";

import { useRef } from "react";
import { useDrag } from "react-dnd";

import styles from "@/styles/Block.module.css";

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

  drag(ref); // connects ref to react-dnd

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
