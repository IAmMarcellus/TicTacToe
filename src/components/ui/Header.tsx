import React, { memo } from "react";
import { Box, Text } from "../../theme/ThemeProvider";
import { IconButton } from "./IconButton";

interface HeaderProps {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showBorder?: boolean;
}

export const Header = memo<HeaderProps>(
  ({
    title,
    leftIcon,
    rightIcon,
    onLeftPress,
    onRightPress,
    showBorder = true,
  }) => {
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        paddingHorizontal="l"
        paddingTop="xxxl"
        paddingBottom="l"
        borderBottomWidth={showBorder ? 1 : 0}
        borderBottomColor="border"
      >
        {leftIcon && onLeftPress ? (
          <IconButton icon={leftIcon} onPress={onLeftPress} size="medium" />
        ) : (
          <Box width={40} />
        )}

        <Text variant="title" marginLeft="m" flex={1}>
          {title}
        </Text>

        {rightIcon && onRightPress ? (
          <IconButton icon={rightIcon} onPress={onRightPress} size="medium" />
        ) : (
          <Box width={40} />
        )}
      </Box>
    );
  }
);
