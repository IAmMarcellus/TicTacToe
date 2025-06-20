import React, { memo, useCallback, useMemo } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Box, Text } from "../theme/ThemeProvider";
import { useTheme } from "../hooks/useTheme";
import { Theme } from "../theme/theme";

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "gradient";
  size?: "small" | "medium" | "large";
}

export const ThemedButton = memo<ThemedButtonProps>(
  ({
    title,
    variant = "primary",
    size = "medium",
    style,
    onPressIn,
    onPressOut,
    ...props
  }) => {
    const { colors, spacing, borderRadii } = useTheme();
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = useCallback(
      (event: any) => {
        Animated.spring(scaleAnim, {
          toValue: 0.95,
          useNativeDriver: true,
        }).start();
        onPressIn?.(event);
      },
      [scaleAnim, onPressIn]
    );

    const handlePressOut = useCallback(
      (event: any) => {
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        onPressOut?.(event);
      },
      [scaleAnim, onPressOut]
    );

    const getTextColor = useMemo((): keyof Theme["colors"] => {
      if (variant === "outline") {
        return "primary";
      }
      return "white";
    }, [variant]);

    const getGradientColors = useMemo(() => {
      switch (variant) {
        case "gradient":
          return ["#667eea", "#764ba2"] as const;
        default:
          return [colors.primary, colors.primary] as const;
      }
    }, [variant, colors.primary]);

    // Get button styles from theme
    const buttonStyles = useMemo(() => {
      const variantStyles = {
        primary: {
          backgroundColor: colors.primary,
          borderWidth: 0,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        },
        secondary: {
          backgroundColor: colors.secondary,
          borderWidth: 0,
          shadowColor: colors.secondary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        },
        outline: {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: colors.primary,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        },
        gradient: {
          borderWidth: 0,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 12,
        },
      };

      const sizeStyles = {
        small: {
          paddingHorizontal: spacing.m,
          paddingVertical: spacing.s,
          borderRadius: borderRadii.l,
        },
        medium: {
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.m,
          borderRadius: borderRadii.xxxl,
        },
        large: {
          paddingHorizontal: spacing.xxl,
          paddingVertical: spacing.l,
          borderRadius: borderRadii.xxxl,
        },
      };

      return {
        ...variantStyles[variant],
        ...sizeStyles[size],
      };
    }, [variant, size, colors, spacing, borderRadii]);

    const animatedViewStyle = useMemo(
      () => ({ transform: [{ scale: scaleAnim }] }),
      [scaleAnim]
    );

    const gradientStyle = useMemo(
      () => ({
        position: "absolute" as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: borderRadii.xxxl,
        alignItems: "center" as const,
        justifyContent: "center" as const,
        minHeight: 56,
      }),
      [borderRadii.xxxl]
    );

    const gradientTextStyle = useMemo(
      () => ({
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600" as const,
        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      }),
      []
    );

    const regularTextStyle = useMemo(
      () => ({
        color: getTextColor === "white" ? "#FFFFFF" : colors.primary,
        fontSize: 18,
        fontWeight: "600" as const,
      }),
      [getTextColor, colors.primary]
    );

    if (variant === "gradient") {
      return (
        <Animated.View style={animatedViewStyle}>
          <TouchableOpacity
            style={style}
            activeOpacity={0.8}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            {...props}
          >
            <Box style={[buttonStyles, { backgroundColor: "transparent" }]}>
              <LinearGradient
                colors={getGradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={gradientStyle}
              />
              <Text
                variant="button"
                color="white"
                textAlign="center"
                style={gradientTextStyle}
              >
                {title}
              </Text>
            </Box>
          </TouchableOpacity>
        </Animated.View>
      );
    }

    return (
      <Animated.View style={animatedViewStyle}>
        <TouchableOpacity
          style={style}
          activeOpacity={0.8}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          {...props}
        >
          <Box style={buttonStyles}>
            <Text
              variant="button"
              color={getTextColor}
              textAlign="center"
              style={regularTextStyle}
            >
              {title}
            </Text>
          </Box>
        </TouchableOpacity>
      </Animated.View>
    );
  }
);
