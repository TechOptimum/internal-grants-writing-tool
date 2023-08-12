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
  useDisclosure,
} from '@chakra-ui/react';
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteGrant = async () => {
    try {
      onDelete();
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
            The amount paid is, ${amount}
          </CardFooter>
          <Stack direction="row">
            <IconButton
              aria-label="Delete"
              icon={<DeleteIcon />}
              onClick={deleteGrant}
            />
            <IconButton
              aria-label="Update"
              icon={<RepeatIcon />}
              onClick={onOpen}
            />
          </Stack>
        </Box>
      </Card>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
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
    </>
  );
};

export default Grant;
