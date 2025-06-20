import React, { memo } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Box, Text } from "../../theme/ThemeProvider";

interface SelectionCardProps extends TouchableOpacityProps {
  icon?: string;
  title: string;
  isSelected?: boolean;
  onPress: () => void;
  marginBottom?: "s" | "m" | "l" | "xl";
}

export const SelectionCard = memo<SelectionCardProps>(
  ({
    icon,
    title,
    isSelected = false,
    onPress,
    marginBottom = "s",
    ...props
  }) => {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} {...props}>
        <Box
          flexDirection="row"
          alignItems="center"
          paddingVertical="m"
          paddingHorizontal="l"
          borderRadius="m"
          backgroundColor={isSelected ? "primary" : "cardPrimaryBackground"}
          opacity={isSelected ? 0.9 : 1}
          marginBottom={marginBottom}
        >
          {icon && (
            <Text fontSize={20} marginRight="m">
              {icon}
            </Text>
          )}
          <Text variant="body" flex={1} color="primaryText">
            {title}
          </Text>
          {isSelected && (
            <Text fontSize={16} color="primaryText">
              ✓
            </Text>
          )}
        </Box>
      </TouchableOpacity>
    );
  }
);
