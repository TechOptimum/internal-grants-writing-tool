import React from 'react';
import {
  Card,
  CardHeader,
  CardFooter,
  Box,
  Stack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { RepeatIcon, DeleteIcon } from '@chakra-ui/icons';
import UpdateGrant from './UpdateGrant';
import Head from 'next/head';

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
  const { isOpen: isOpenUpdateModal, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal } = useDisclosure();
  const {isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal} = useDisclosure();

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
            Amount: {amount}
            <br />
            Grant ID: {grant_id}
          </CardFooter>
          <Stack direction="row" justify='flex-end'>
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
        <Head>
          <title>Delete | TechOptimum Grants Writing Tool</title>
        </Head>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this grant?
          </ModalBody>
          <ModalFooter>
            <Button onClick={deleteGrant} colorScheme='red' marginRight={2}>Yes</Button>
            <Button onClick={onCloseDeleteModal} colorScheme='blue'>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Grant;
