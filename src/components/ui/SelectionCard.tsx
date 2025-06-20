import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Box, Text } from "../../theme/ThemeProvider";
import { useTheme } from "../../hooks/useTheme";

interface SelectionCardProps extends TouchableOpacityProps {
  icon?: string;
  title: string;
  isSelected?: boolean;
  onPress: () => void;
  marginBottom?: "s" | "m" | "l" | "xl";
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  icon,
  title,
  isSelected = false,
  onPress,
  marginBottom = "s",
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} {...props}>
      <Box
        flexDirection="row"
        alignItems="center"
        paddingVertical="m"
        paddingHorizontal="l"
        borderRadius="m"
        backgroundColor={isSelected ? "primary" : "cardPrimaryBackground"}
        opacity={isSelected ? 0.1 : 1}
        marginBottom={marginBottom}
      >
        {icon && (
          <Text fontSize={20} marginRight="m">
            {icon}
          </Text>
        )}
        <Text variant="body" flex={1}>
          {title}
        </Text>
        {isSelected && (
          <Text fontSize={16} color="primary">
            ✓
          </Text>
        )}
      </Box>
    </TouchableOpacity>
  );
};
