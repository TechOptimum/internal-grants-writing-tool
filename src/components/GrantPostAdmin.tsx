import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Box,
  Stack,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { RepeatIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import UpdateGrant from "./UpdateGrant";
import { api } from "~/utils/api";

interface GrantProps {
  userId: string;
  title: string;
  amount: number;
  criteria: string;
  description: string;
  onDelete: () => void;
  grant_id: string;
  endDate: Date;
  available: boolean;
  assigned: string;
}

const Grant: React.FC<GrantProps> = ({
  userId,
  title,
  onDelete,
  amount,
  grant_id,
  criteria,
  description,
  endDate,
  available,
  assigned,
}) => {
  const {
    isOpen: isOpenUpdateModal,
    onOpen: onOpenUpdateModal,
    onClose: onCloseUpdateModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const toast = useToast()

  const user = api.grants.getUserById.useQuery({ userId });

  const deleteGrant = () => {
    try {
      onDelete();
      onCloseDeleteModal();
      toast({
        title: "Deleted grant successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch {
      console.error("There was an error performing this function");
    }
  };

  return (
    <>
      <Card w="100%">
        <Box w="100%">
          <CardHeader fontSize="xl" fontWeight="bold">
            {title}
          </CardHeader>
          <CardFooter fontWeight="medium">
            Amount: {amount}
            <br />
            Grant ID: {grant_id}
            <br />
            Availablity: {available ? "Available" : "Not available"}
            <br />
            {assigned
              ? `Assigned to: ${user.data?.firstName} ${user.data?.lastName}`
              : "Not assigned"}
          </CardFooter>
          <Stack direction="row" justify="flex-end">
            <Button
              flex="1"
              variant="ghost"
              leftIcon={<DeleteIcon />}
              onClick={onOpenDeleteModal}
            >
              Delete
            </Button>
            <Button
              flex="1"
              variant="ghost"
              leftIcon={<EditIcon />}
              onClick={onOpenUpdateModal}
            >
              Edit
            </Button>
          </Stack>
        </Box>
      </Card>
      <Modal
        isOpen={isOpenUpdateModal}
        onClose={onCloseUpdateModal}
        isCentered
        closeOnOverlayClick={false}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Text fontSize="3xl" fontWeight="bold">
              Update the grant
            </Text>
            <Text marginBottom={4} color="gray" fontWeight="medium">
              Update your grant as you please!
            </Text>
          </ModalHeader>
          <ModalBody pb={6}>
            <UpdateGrant
                grant_id={grant_id}
                initialTitle={title}
                initialAmount={amount}
                initialCriteria={criteria}
                initialDescription={description}
                initialEndDate={endDate}
                initialAvailability={available}
              />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        onClose={onCloseDeleteModal}
        isOpen={isOpenDeleteModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this grant?</ModalBody>
          <ModalFooter>
            <Button
              onClick={deleteGrant}
              variant="outline"
              colorScheme="blue"
              marginRight={2}
            >
              Yes
            </Button>
            <Button onClick={onCloseDeleteModal} colorScheme="blue">
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Grant;
