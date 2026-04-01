export type GameVariant = "classic" | "4x4" | "misere";

export type VariantConfig = {
  boardSize: number;
  winLength: number;
  misere: boolean;
};

export type GameOptions = {
  config: VariantConfig;
  variant: GameVariant;
  difficulty: Difficulty;
};

export type VariantMeta = {
  label: string;
  icon: string;
};

export const VARIANT_CONFIGS: Record<GameVariant, VariantConfig> = {
  classic: { boardSize: 3, winLength: 3, misere: false },
  "4x4": { boardSize: 4, winLength: 4, misere: false },
  misere: { boardSize: 3, winLength: 3, misere: true },
};

export type Difficulty = "easy" | "hard" | "impossible";

export type DifficultyMeta = {
  label: string;
  icon: string;
};

export const DIFFICULTIES: Difficulty[] = ["easy", "hard", "impossible"];

export const DIFFICULTY_META: Record<Difficulty, DifficultyMeta> = {
  easy: { label: "Easy", icon: "😊" },
  hard: { label: "Hard", icon: "🔥" },
  impossible: { label: "Impossible", icon: "💀" },
};

export const VARIANTS: GameVariant[] = ["classic", "4x4", "misere"];

export const VARIANT_META: Record<GameVariant, VariantMeta> = {
  classic: { label: "Classic", icon: "🎮" },
  "4x4": { label: "4x4", icon: "🔲" },
  misere: { label: "Misère", icon: "🔄" },
};
