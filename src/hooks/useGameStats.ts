import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../utils/constants";
import { GameVariant, Difficulty } from "../types/variant";

export interface GameStats {
  wins: number;
  losses: number;
  draws: number;
}

export type AllStats = Record<string, GameStats>;

export const EMPTY_STATS: GameStats = { wins: 0, losses: 0, draws: 0 };

export const statsKey = (variant: GameVariant, difficulty: Difficulty): string =>
  `${variant}:${difficulty}`;

export const useAllStats = () => {
  const [allStats, setAllStats] = useState<AllStats>({});
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.DETAILED_STATS);
      if (stored) setAllStats(JSON.parse(stored));
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveStats = useCallback(async (newAllStats: AllStats) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.DETAILED_STATS,
        JSON.stringify(newAllStats)
      );
    } catch (error) {
      console.error("Failed to save stats:", error);
    }
  }, []);

  const updateStats = useCallback(
    (variant: GameVariant, difficulty: Difficulty, result: "win" | "loss" | "draw") => {
      setAllStats((prev) => {
        const key = statsKey(variant, difficulty);
        const current = prev[key] ?? { ...EMPTY_STATS };
        const updated = { ...current };

        if (result === "win") updated.wins += 1;
        else if (result === "loss") updated.losses += 1;
        else updated.draws += 1;

        const newAll = { ...prev, [key]: updated };
        saveStats(newAll);
        return newAll;
      });
    },
    [saveStats]
  );

  const resetStats = useCallback(async () => {
    setAllStats({});
    await saveStats({});
  }, [saveStats]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return { allStats, isLoading, updateStats, resetStats };
};

export const useGameStats = (variant: GameVariant, difficulty: Difficulty) => {
  const { allStats, isLoading, updateStats: updateAllStats, resetStats } = useAllStats();

  const key = statsKey(variant, difficulty);
  const stats: GameStats = allStats[key] ?? EMPTY_STATS;

  const totalGames = stats.wins + stats.losses + stats.draws;
  const winPercentage = totalGames > 0 ? (stats.wins / totalGames) * 100 : 0;

  const updateStats = useCallback(
    (result: "win" | "loss" | "draw") => {
      updateAllStats(variant, difficulty, result);
    },
    [updateAllStats, variant, difficulty]
  );

  return {
    stats,
    isLoading,
    updateStats,
    resetStats,
    totalGames,
    winPercentage,
  };
};
