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
    <Box flexDirection="row" justifyContent="space-between" alignItems="center">
      <Text variant="body" color="secondaryText" fontSize={14} fontWeight="500">
        {label}
      </Text>
      <Text variant="body" fontWeight="700" color={getColor()} fontSize={16}>
        {value}
      </Text>
    </Box>
  );
};

interface SummaryCardProps {
  children: React.ReactNode;
  marginBottom?: "s" | "m" | "l" | "xl";
  justifyContent?: "space-between" | "flex-start" | "flex-end" | "center";
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  children,
  justifyContent = "space-between",
}) => {
  return (
    <Box
      backgroundColor="cardSecondaryBackground"
      borderRadius="l"
      padding="m"
      borderWidth={1}
      borderColor="border"
      shadowColor="shadow"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={2}
      justifyContent={justifyContent}
    >
      {children}
    </Box>
  );
};

export { SummaryRow };
