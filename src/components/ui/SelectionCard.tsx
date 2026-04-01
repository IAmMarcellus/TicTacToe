import React, { memo } from "react";
import { Pressable, PressableProps } from "react-native";
import { Box, Text } from "../../theme/ThemeProvider";

interface SelectionCardProps extends PressableProps {
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
      <Pressable onPress={onPress} {...props}>
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
          {icon ? (
            <Text fontSize={20} marginRight="m">
              {icon}
            </Text>
          ) : null}
          <Text variant="body" flex={1} color="primaryText">
            {title}
          </Text>
          {isSelected ? (
            <Text fontSize={16} color="primaryText">
              ✓
            </Text>
          ) : null}
        </Box>
      </Pressable>
    );
  }
);
