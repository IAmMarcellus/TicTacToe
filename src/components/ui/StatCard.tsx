import React from "react";
import { Box, Text } from "../../theme/ThemeProvider";

interface StatCardProps {
  value: string | number;
  label: string;
  color?: "primary" | "secondary" | "success" | "default";
  flex?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  color = "default",
  flex = 1,
}) => {
  const getColor = () => {
    switch (color) {
      case "primary":
        return "primary";
      case "secondary":
        return "secondary";
      case "success":
        return "success";
      default:
        return "primaryText";
    }
  };

  return (
    <Box alignItems="center" flex={flex}>
      <Text variant="title" fontSize={20} color={getColor()} marginBottom="xs">
        {value}
      </Text>
      <Text variant="caption" color="secondaryText">
        {label}
      </Text>
    </Box>
  );
};
