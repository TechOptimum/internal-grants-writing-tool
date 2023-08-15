import Head from 'next/head';
import React from 'react';
import { api } from '~/utils/api';
import { 
  Button, 
  Modal, 
  ModalBody, 
  ModalOverlay, 
  ModalContent, 
  ModalCloseButton, 
  useDisclosure, 
  VStack, 
  Wrap, 
  Text 
} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons'
import CreateGrant from '~/components/CreateGrant';
import GrantPost from '~/components/GrantPost';

const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: grants, refetch: refetchGrants } = api.grants.getGrants.useQuery();

  const deleteGrant = api.grants.deleteGrant.useMutation({
    onSuccess: () => {
      void refetchGrants()
    }
  });
  

  const handleDeleteClick = async (id: string) => {
    try {
      await deleteGrant.mutateAsync({
        id,
      });

      alert('Deleted sucessfully!')

    } catch (error) {
      console.error('Error deleting grant:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard | TechOptimum Grants Writing Tool</title>
      </Head>
      <div>
        <Text fontSize="4xl" fontWeight="bold" mb="0.3rem">
          Admin Portal
        </Text>
        <Text color="grey" fontSize='lg' marginBottom={5}>
          To create a grant, press the + button at the bottom of your screen and fill in the form provided by our team!
        </Text>
        <Button
          onClick={onOpen}
          position="fixed"
          bottom="20px"
          right="20px"
          size='lg'
        >
          <AddIcon />
        </Button>
        <VStack w="100%" align="start">
          <Wrap w="100%" justify="center"> 
            {grants ? (
              <>
                {grants.map((grant) => (
                  <GrantPost
                    title={grant.title}
                    amount={grant.amount}
                    criteria={grant.criteria}
                    description={grant.description}
                    onDelete={() => void handleDeleteClick(grant.id)}
                    grant_id={grant.id}
                  />
                ))}
              </>
            ) : (
              <p>Loading grants...</p>
            )}
          </Wrap>
        </VStack>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CreateGrant />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );

  
};

export default Admin;
