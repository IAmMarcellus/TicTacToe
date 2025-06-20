import React, { memo, useMemo } from "react";
import { Box } from "../../theme/ThemeProvider";

interface CardProps {
  variant?: "primary" | "secondary" | "elevated";
  padding?: "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
  margin?: "s" | "m" | "l" | "xl" | "xxl" | "none";
  children: React.ReactNode;
  [key: string]: any; // Allow other Box props
}

export const Card = memo<CardProps>(
  ({
    variant = "primary",
    padding = "l",
    margin = "m",
    children,
    ...props
  }) => {
    const getCardStyles = useMemo(() => {
      switch (variant) {
        case "primary":
          return {
            backgroundColor: "cardPrimaryBackground" as const,
            borderWidth: 1,
            borderColor: "border" as const,
            shadowColor: "shadow" as const,
            shadowOffset: { width: 2, height: 8 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
            elevation: 2,
          };
        case "secondary":
          return {
            backgroundColor: "cardSecondaryBackground" as const,
            borderWidth: 1,
            borderColor: "border" as const,
          };
        case "elevated":
          return {
            backgroundColor: "cardSecondaryBackground" as const,
            borderWidth: 0,
            shadowColor: "shadow" as const,
            shadowOffset: { width: 8, height: 16 },
            shadowOpacity: 0.8,
            shadowRadius: 16,
            elevation: 8,
          };
        default:
          return {
            backgroundColor: "cardPrimaryBackground" as const,
            borderWidth: 1,
            borderColor: "border" as const,
          };
      }
    }, [variant]);

    return (
      <Box
        borderRadius="xl"
        padding={padding}
        marginBottom={margin === "none" ? undefined : margin}
        {...getCardStyles}
        {...props}
      >
        {children}
      </Box>
    );
  }
);
