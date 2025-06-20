import { memo } from "react";
import { Modal } from "react-native";
import { Box, Text } from "../theme/ThemeProvider";
import { ThemedButton } from "./ThemedButton";
import { ModalOverlay } from "./ui";

interface GameResultModalProps {
  visible: boolean;
  message: string;
  onPlayAgain: () => void;
}

export const GameResultModal = memo(
  ({ visible, message, onPlayAgain }: GameResultModalProps) => {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <ModalOverlay>
          <Box
            backgroundColor="cardPrimaryBackground"
            borderRadius="xl"
            padding="xl"
            width="100%"
            maxWidth={300}
            alignItems="center"
            borderWidth={1}
            borderColor="border"
            shadowColor="shadow"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.3}
            shadowRadius={8}
            elevation={10}
          >
            {/* Game Result Message */}
            <Box alignItems="center" marginBottom="xl">
              <Text
                variant="title"
                fontSize={24}
                marginBottom="m"
                textAlign="center"
              >
                {message}
              </Text>
              <Text variant="bodySecondary" textAlign="center">
                Ready for another round?
              </Text>
            </Box>

            {/* Play Again Button */}
            <ThemedButton
              title="Play Again"
              onPress={onPlayAgain}
              variant="primary"
            />
          </Box>
        </ModalOverlay>
      </Modal>
    );
  }
);
