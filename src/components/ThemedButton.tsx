import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Box, Text } from "../theme/ThemeProvider";
import { useTheme } from "../hooks/useTheme";
import { ThemeColors } from "../theme/theme";

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  variant = "primary",
  size = "medium",
  style,
  ...props
}) => {
  const { colors, spacing, borderRadii } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: colors.primary,
          borderWidth: 0,
        };
      case "secondary":
        return {
          backgroundColor: colors.secondary,
          borderWidth: 0,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: colors.primary,
        };
      default:
        return {
          backgroundColor: colors.primary,
          borderWidth: 0,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          paddingHorizontal: spacing.m,
          paddingVertical: spacing.s,
          borderRadius: borderRadii.m,
        };
      case "large":
        return {
          paddingHorizontal: spacing.xxl,
          paddingVertical: spacing.l,
          borderRadius: borderRadii.xxxl,
        };
      default:
        return {
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.m,
          borderRadius: borderRadii.xxxl,
        };
    }
  };

  const getTextColor = (): ThemeColors => {
    if (variant === "outline") {
      return "primary";
    }
    return "white";
  };

  return (
    <TouchableOpacity
      style={[getVariantStyles(), getSizeStyles(), style]}
      activeOpacity={0.8}
      {...props}
    >
      <Text variant="button" color={getTextColor()} textAlign="center">
        {title}
      </Text>
    </TouchableOpacity>
  );
};
