import React from "react";
import { Box, Text } from "../../theme/ThemeProvider";

interface SummaryRowProps {
  label: string;
  value: string | number;
  valueColor?: "primary" | "secondary" | "success" | "default";
}

const SummaryRow: React.FC<SummaryRowProps> = ({
  label,
  value,
  valueColor = "default",
}) => {
  const getColor = () => {
    switch (valueColor) {
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
    <Box flexDirection="row" justifyContent="space-between" marginBottom="xs">
      <Text variant="body" color="secondaryText">
        {label}:
      </Text>
      <Text variant="body" fontWeight="bold" color={getColor()}>
        {value}
      </Text>
    </Box>
  );
};

interface SummaryCardProps {
  children: React.ReactNode;
  marginBottom?: "s" | "m" | "l" | "xl";
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  children,
  marginBottom = "l",
}) => {
  return (
    <Box
      backgroundColor="cardSecondaryBackground"
      borderRadius="m"
      padding="m"
      borderWidth={1}
      borderColor="border"
      marginBottom={marginBottom}
    >
      {children}
    </Box>
  );
};

export { SummaryRow };
