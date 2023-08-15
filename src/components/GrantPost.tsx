import React from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardFooter,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import { RepeatIcon, DeleteIcon } from '@chakra-ui/icons';
import UpdateGrant from './UpdateGrant';

interface GrantProps {
  title: string;
  amount: number;
  criteria: string;
  description: string;
  onDelete: () => void;
  grant_id: string;
}

const Grant: React.FC<GrantProps> = ({
  title,
  onDelete,
  amount,
  grant_id,
  criteria,
  description,
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

  const deleteGrant = async () => {
    try {
      onDelete();
      onCloseDeleteModal();
    } catch {
      console.error('There was an error performing this function');
    }
  };

  return (
    <>
      <Card w={{ base: '280px', md: '550px' }}>
        <Box w="100%">
          <CardHeader fontSize="xl" fontWeight="bold">
            {title}
          </CardHeader>
          <CardFooter color="blackAlpha.700" fontWeight="medium">
            <Stack spacing={1}>
              <Text>Amount: {amount}</Text>
              <Text>Grant ID: {grant_id}</Text>
            </Stack>
          </CardFooter>
          <Stack direction="row" spacing={2} mt={2}>
            <IconButton
              aria-label="Delete"
              icon={<DeleteIcon />}
              onClick={onOpenDeleteModal}
            />
            <IconButton
              aria-label="Update"
              icon={<RepeatIcon />}
              onClick={onOpenUpdateModal}
            />
          </Stack>
        </Box>
      </Card>
      <Modal
        isOpen={isOpenUpdateModal}
        onClose={onCloseUpdateModal}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <UpdateGrant
              grant_id={grant_id}
              initialTitle={title}
              initialAmount={amount}
              initialCriteria={criteria}
              initialDescription={description}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={onCloseDeleteModal} isOpen={isOpenDeleteModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Head>
            <title>Confirm to delete grant</title>
          </Head>
          <ModalHeader>Confirmation for deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this grant?</ModalBody>
          <ModalFooter>
            <Button onClick={deleteGrant} marginRight={2} colorScheme="blue">
              Yes
            </Button>
            <Button onClick={onCloseDeleteModal} colorScheme="red">
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Grant;
