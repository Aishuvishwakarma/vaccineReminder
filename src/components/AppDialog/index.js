import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  useDisclosure,
  Flex,
  Text,
  IconButton
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { MdWarning } from "react-icons/md";

const ConfirmationDialog = ({
  isOpen,
  onOpen,
  onClose,
  title,
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
}) => {
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogCloseButton />
          <AlertDialogHeader>
            <Flex direction="column" align="center" mt={4}>
              <Icon as={MdWarning} width="40px" height="40px" color="red.300" />
              <Text mt={2} fontSize="lg">
                {title}
              </Text>
            </Flex>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Flex w="100%" justify="flex-end">
              <Button colorScheme="red" onClick={onConfirm}>
                {confirmText}
              </Button>
              <Button ref={cancelRef} onClick={onClose}>
                {cancelText}
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConfirmationDialog;
