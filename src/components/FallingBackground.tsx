import { memo, useEffect, useMemo, useRef } from "react";
import { Dimensions, StyleSheet, TextStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "../hooks/useTheme";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ELEMENT_COUNT = 18;

interface FallingElement {
  char: string;
  x: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  rotation: number;
}

const generateElements = (): FallingElement[] =>
  Array.from({ length: ELEMENT_COUNT }, () => ({
    char: Math.random() > 0.5 ? "X" : "O",
    x: Math.random() * (SCREEN_WIDTH - 30),
    size: 22 + Math.random() * 16,
    opacity: 0.15 + Math.random() * 0.15,
    duration: 8000 + Math.random() * 7000,
    delay: Math.random() * 5000,
    drift: -20 + Math.random() * 40,
    rotation: -30 + Math.random() * 60,
  }));

const FallingChar = memo(
  ({ element, color }: { element: FallingElement; color: string }) => {
    const translateY = useSharedValue(-element.size - 20);
    const translateX = useSharedValue(0);

    useEffect(() => {
      translateY.value = withDelay(
        element.delay,
        withRepeat(
          withTiming(SCREEN_HEIGHT + element.size, {
            duration: element.duration,
            easing: Easing.linear,
          }),
          -1
        )
      );

      translateX.value = withDelay(
        element.delay,
        withRepeat(
          withTiming(element.drift, {
            duration: element.duration,
            easing: Easing.inOut(Easing.sin),
          }),
          -1,
          true
        )
      );
    }, [translateY, translateX, element]);

    const rotation = `${element.rotation}deg`;
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { rotate: rotation },
      ],
    }));

    const staticStyle = useMemo<TextStyle>(
      () => ({
        left: element.x,
        fontSize: element.size,
        opacity: element.opacity,
        color,
      }),
      [element, color]
    );

    return (
      <Animated.Text style={[styles.char, staticStyle, animatedStyle]}>
        {element.char}
      </Animated.Text>
    );
  }
);

export const FallingBackground = memo(() => {
  const { isDark } = useTheme();
  const elements = useRef(generateElements()).current;
  const color = isDark ? "#4B5563" : "#B0B5BD";

  return (
    <Animated.View style={styles.container} pointerEvents="none">
      {elements.map((element, index) => (
        <FallingChar key={index} element={element} color={color} />
      ))}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  char: {
    position: "absolute",
    fontFamily: "Chalkduster",
    fontWeight: "700",
  },
});
