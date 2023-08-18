import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Box,
  Stack,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  CardFooter,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { api } from "~/utils/api";

const Upload = ({
  title,
  grantId,
  userId,
  onUnassign,
}: {
  title: string;
  grantId: string;
  userId: string;
  onUnassign: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const [isGroupHover, setIsGroupHover] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: user } = api.grants.getUserById.useQuery({ userId });

  if (!user) return null;

  return (
    <>
      <Button h="auto" p="0px" my="0.3rem" w="100%" onClick={onOpen}>
        <Card
          size="sm"
          variant="outline"
          w="100%"
          transitionDuration="100ms"
          _hover={{
            backgroundColor: "rgb(240,240,240)",
          }}
          onMouseEnter={() => setIsGroupHover(true)}
          onMouseLeave={() => setIsGroupHover(false)}
        >
          <HStack justify="space-between" pe="1rem">
            <Stack>
              <CardHeader fontSize="xl" fontWeight="bold" textAlign="start">
                {title}
              </CardHeader>
              <CardFooter>
                Assigned to: {user.firstName + " " + user.lastName}
              </CardFooter>
            </Stack>
            <Box
              transitionDuration="100ms"
              transform={isGroupHover ? "translateX(5px)" : "translateX(0px)"}
            >
              <ArrowRightIcon />
            </Box>
          </HStack>
        </Card>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="xl" fontWeight="bold">
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%">
              Grant ID: {grantId}
              <br />
              <br />
              Assigned to: {user.firstName + " " + user.lastName}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              bg="red"
              color="white"
              onClick={(event) => {
                onUnassign(event);
                onClose();
              }}
            >
              Unassign
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Upload;
