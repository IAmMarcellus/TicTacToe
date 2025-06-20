import React, { useMemo } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Box, Text } from "../../theme/ThemeProvider";
import { useTheme } from "../../hooks/useTheme";

interface IconButtonProps extends TouchableOpacityProps {
  icon: string;
  text?: string;
  size?: "small" | "medium" | "large";
  variant?: "default" | "outlined" | "filled";
  onPress: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  text,
  size = "medium",
  variant = "default",
  onPress,
  style,
  ...props
}) => {
  const { colors, borderRadii } = useTheme();

  const sizeStyles = useMemo((): ViewStyle => {
    switch (size) {
      case "small":
        return {
          width: 32,
          height: 32,
          borderRadius: borderRadii.round,
        };
      case "large":
        return {
          width: 48,
          height: 48,
          borderRadius: borderRadii.round,
        };
      default:
        return {
          width: 40,
          height: 40,
          borderRadius: borderRadii.round,
        };
    }
  }, [size, borderRadii.round]);

  const variantStyles = useMemo((): ViewStyle => {
    switch (variant) {
      case "outlined":
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: colors.border,
        };
      case "filled":
        return {
          backgroundColor: colors.cardSecondaryBackground,
          borderWidth: 2,
          borderColor: colors.border,
        };
      default:
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
        };
    }
  }, [variant, colors.border, colors.cardSecondaryBackground]);

  const iconSize = useMemo(() => {
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 24;
      default:
        return 20;
    }
  }, [size]);

  const buttonContainerStyle = useMemo((): ViewStyle => {
    return { flexDirection: "row", alignItems: "center" };
  }, []);

  const iconContainerStyle = useMemo(() => {
    return [sizeStyles, variantStyles];
  }, [sizeStyles, variantStyles]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[buttonContainerStyle, style]}
      {...props}
    >
      <Box
        style={iconContainerStyle}
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize={iconSize} color="primaryText">
          {icon}
        </Text>
      </Box>
      {text && (
        <Text variant="body" color="primaryText">
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
