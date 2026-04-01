export type GameVariant = "classic" | "4x4" | "misere" | "fogOfWar";

export type VariantConfig = {
  boardSize: number;
  winLength: number;
  misere: boolean;
  fogOfWar: boolean;
};

export type VariantMeta = {
  label: string;
  icon: string;
};

export const VARIANT_CONFIGS: Record<GameVariant, VariantConfig> = {
  classic: { boardSize: 3, winLength: 3, misere: false, fogOfWar: false },
  "4x4": { boardSize: 4, winLength: 4, misere: false, fogOfWar: false },
  misere: { boardSize: 3, winLength: 3, misere: true, fogOfWar: false },
  fogOfWar: { boardSize: 3, winLength: 3, misere: false, fogOfWar: true },
};

export const VARIANT_META: Record<GameVariant, VariantMeta> = {
  classic: { label: "Classic", icon: "🎮" },
  "4x4": { label: "4x4", icon: "🔲" },
  misere: { label: "Misère", icon: "🔄" },
  fogOfWar: { label: "Fog of War", icon: "🌫️" },
};
