import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Text,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { AiFillFileText } from 'react-icons/ai';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import Head from 'next/head';
import { api } from '~/utils/api';


const CreateGrant = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [criteria, setCriteria] = useState('');


  const size = '3xl';
  const {refetch: refetchGrants} = api.grants.getGrants.useQuery()
  const createGrant = api.grants.creats.useMutation({
    onSucess: () => {
      void refetchGrants()
    }
  });

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setAmount('');
    setCriteria('');
  };

  const handleSaveClick = async () => {
    try {
      if (!title || !amount || !description || !criteria) {
        return;
      }

      await createGrant.mutateAsync({
        title,
        amount: parseFloat(amount),
        description,
        criteria,
      });

      

      resetForm();
    } catch (error) {
      console.error('Error creating grant:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Grant Creation | TechOptimum Grants Writing Tool</title>
      </Head>
        <Flex align="center" marginBottom="1rem">
          <Text fontSize={size} fontWeight="bold">
            Create a Grant
          </Text>
        </Flex>
        <Text marginBottom={4} color="gray">
          Welcome to Tech Optimum's Grant Creation Tool. Fill out the form below to create a grant opportunity.
        </Text>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <InputGroup>
            <InputLeftAddon children={<AiFillFileText />} />
            <Input
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl marginTop={4} isRequired>
          <FormLabel>Amount</FormLabel>
          <InputGroup>
            <InputLeftAddon children='$' />
            <Input
              type="number"
              placeholder="Enter the amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl marginTop={4} isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl marginTop={4} isRequired>
          <FormLabel>Criteria</FormLabel>
          <Textarea
            placeholder="Enter the grant's criteria"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
          />
        </FormControl>
        <Divider my={6} />
        <Flex justifyContent="flex-end" marginTop={8}>
          <Button colorScheme="gray" marginRight={4} onClick={resetForm}>
            Reset
          </Button>
          <Button colorScheme="blue" onClick={handleSaveClick}>
            Save
          </Button>
        </Flex>
    </>
  );
};

export default CreateGrant;
