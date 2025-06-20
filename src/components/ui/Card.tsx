import React from "react";
import { Box } from "../../theme/ThemeProvider";

interface CardProps {
  variant?: "primary" | "secondary" | "elevated";
  padding?: "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
  margin?: "s" | "m" | "l" | "xl" | "xxl" | "none";
  children: React.ReactNode;
  [key: string]: any; // Allow other Box props
}

export const Card: React.FC<CardProps> = ({
  variant = "primary",
  padding = "l",
  margin = "m",
  children,
  ...props
}) => {
  const getCardStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "cardPrimaryBackground" as const,
          borderWidth: 1,
          borderColor: "border" as const,
          shadowColor: "shadow" as const,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
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
          shadowOffset: { width: 0.2, height: 8 },
          shadowOpacity: 0.15,
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
  };

  return (
    <Box
      borderRadius="xl"
      padding={padding}
      marginBottom={margin === "none" ? undefined : margin}
      {...getCardStyles()}
      {...props}
    >
      {children}
    </Box>
  );
};
