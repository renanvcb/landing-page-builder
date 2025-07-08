"use client";

import { ReactNode } from "react";
import { DndProvider } from "react-dnd";
import { isMobile } from "react-device-detect";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

export function DndWrapper({ children }: { children: ReactNode }) {
  const options = {
    enableMouseEvents: true, // Enable mouse events for desktop compatibility
    enableTouchEvents: true, // Enable touch events for mobile compatibility
  };

  return (
    <DndProvider
      backend={isMobile ? TouchBackend : HTML5Backend}
      options={options}
    >
      {children}
    </DndProvider>
  );
}
