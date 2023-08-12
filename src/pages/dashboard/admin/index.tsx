import Head from 'next/head';
import React, { useState } from 'react';
import { api } from '~/utils/api';
import { Button, Text, Modal, ModalBody, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure, VStack, Wrap, Card, HStack, Stack, CardHeader, CardFooter, Box, ModalHeader, ModalFooter,   } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import CreateGrant from './components/CreateGrant';
import GrantPost from './components/GrantPost';

const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: grants } = api.grants.getGrants.useQuery();

  const deleteGrant = api.grants.deleteGrant.useMutation();

  const handleDeleteClick = async (id: string) => {
    try {
      await deleteGrant.mutateAsync({
        id,
      }); 

      alert('Deleted successfully');
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
        <Button onClick={onOpen}>Create a grant</Button>

        <VStack w="100%" align="start">
          <Wrap w="100%" justify="center"> {/* Set justify prop to center */}
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
