import React, { memo } from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

interface ModalOverlayProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
});

export const ModalOverlay = memo<ModalOverlayProps>(({ children, style }) => {
  return <View style={[styles.overlay, style]}>{children}</View>;
});
