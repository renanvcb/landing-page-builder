export type DroppedComponent = {
  id: string;
  type: string;
  content?: string;
  settings?: {
    textColor?: string;
    bgColor?: string;
    fontSize?: string;
    textAlign?: "left" | "center" | "right";
    url?: string; // Para botões
    width?: number; // Para imagem
    height?: number;
    alt?: string;
  };
};