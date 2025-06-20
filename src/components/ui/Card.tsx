import React from "react";
import { Box } from "../../theme/ThemeProvider";

interface CardProps {
  variant?: "primary" | "secondary";
  padding?: "s" | "m" | "l" | "xl";
  margin?: "s" | "m" | "l" | "xl" | "xxl";
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
  const backgroundColor =
    variant === "primary" ? "cardPrimaryBackground" : "cardSecondaryBackground";

  return (
    <Box
      backgroundColor={backgroundColor}
      borderRadius="l"
      padding={padding}
      marginBottom={margin}
      borderWidth={1}
      borderColor="border"
      {...props}
    >
      {children}
    </Box>
  );
};
