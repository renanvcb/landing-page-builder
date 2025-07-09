export type DroppedComponent = {
  id: string;
  type: string;
  content?: string;
  settings?: {
    textColor?: string;
    bgColor?: string;
    fontSize?: string;
    textAlign?: "left" | "center" | "right";
    url?: string; // For Button
    width?: number; // For Image
    height?: number;
    alt?: string;
  };
};