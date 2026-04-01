import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../utils/constants";

export interface GameStats {
  wins: number;
  losses: number;
  draws: number;
}

export const useGameStats = () => {
  const [stats, setStats] = useState<GameStats>({
    wins: 0,
    losses: 0,
    draws: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load stats from async storage
  const loadStats = useCallback(async () => {
    try {
      const storedStats = await AsyncStorage.getItem(STORAGE_KEYS.GAME_STATS);
      if (storedStats) {
        setStats(JSON.parse(storedStats));
      }
    } catch (error) {
      console.error("Failed to load game stats:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save stats to async storage
  const saveStats = useCallback(async (newStats: GameStats) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.GAME_STATS,
        JSON.stringify(newStats)
      );
    } catch (error) {
      console.error("Failed to save game stats:", error);
    }
  }, []);

  // Update stats when game ends - uses functional setState for stability
  const updateStats = useCallback(
    (result: "win" | "loss" | "draw") => {
      setStats((prev) => {
        const newStats = { ...prev };

        switch (result) {
          case "win":
            newStats.wins += 1;
            break;
          case "loss":
            newStats.losses += 1;
            break;
          case "draw":
            newStats.draws += 1;
            break;
        }

        saveStats(newStats);
        return newStats;
      });
    },
    [saveStats]
  );

  // Reset stats
  const resetStats = useCallback(async () => {
    const newStats = { wins: 0, losses: 0, draws: 0 };
    setStats(newStats);
    await saveStats(newStats);
  }, [saveStats]);

  // Derive directly - trivial arithmetic doesn't need useMemo
  const totalGames = stats.wins + stats.losses + stats.draws;
  const winPercentage = totalGames > 0 ? (stats.wins / totalGames) * 100 : 0;

  // Load stats on mount
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats,
    isLoading,
    updateStats,
    resetStats,
    totalGames,
    winPercentage,
  };
};
