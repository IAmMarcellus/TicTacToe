import React, { useMemo } from "react";
import { View, ViewStyle } from "react-native";
import { Box } from "../../theme/ThemeProvider";

interface ModalOverlayProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  children,
  style,
}) => {
  const overlayStyle = useMemo((): ViewStyle => {
    return {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
    };
  }, []);

  return <View style={[overlayStyle, style]}>{children}</View>;
};
