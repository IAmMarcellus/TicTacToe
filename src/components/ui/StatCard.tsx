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
    <Box
      alignItems="center"
      flex={flex}
      paddingVertical="s"
      paddingHorizontal="xs"
    >
      <Text
        variant="title"
        fontSize={28}
        fontWeight="700"
        color={getColor()}
        marginBottom="xs"
        textAlign="center"
      >
        {value}
      </Text>
      <Text
        variant="caption"
        color="secondaryText"
        fontSize={13}
        fontWeight="600"
        textAlign="center"
        textTransform="uppercase"
        letterSpacing={0.8}
      >
        {label}
      </Text>
    </Box>
  );
};
