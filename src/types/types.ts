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
    btnBgColor?: string; // For Button
    alt?: string;
    maxWidth?: string; // For responsive Image
    maxHeight?: string; // For responsive Image
  };
};