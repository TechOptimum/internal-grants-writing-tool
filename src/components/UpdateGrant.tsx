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

interface CreateGrantProps {
  grant_id: string;
  initialTitle: string;
  initialAmount: number;
  initialDescription: string;
  initialCriteria: string;
}

const CreateGrant = ({ grant_id, initialAmount, initialCriteria, initialDescription, initialTitle }: CreateGrantProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [amount, setAmount] = useState(initialAmount);
  const [criteria, setCriteria] = useState(initialCriteria);
  const [sucessAlert, setsucessAlert] = useState(false);
  const [errorAlert, seterrorAlert] = useState(false);

  const { refetch } = api.grants.getGrants.useQuery();

  const size = '3xl';


  const updateGrant = api.grants.updateGrant.useMutation({
    onSuccess: () => {
      void refetch()
    }
  });

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setAmount(0);
    setCriteria('');
  };

  const handleUpdateClick = async (id: string) => {
    try {
      if (!title || !amount || !description || !criteria) {
        seterrorAlert(true);
        return;
      }

      await updateGrant.mutateAsync({
        title,
        amount,
        description,
        criteria,
        id
      });

      resetForm();
      setsucessAlert(true);
    } catch (error) {
      console.error('Error creating grant:', error);
      seterrorAlert(true);
    }
  };

  return (
    <>
      <Head>
        <title>Grant Update | TechOptimum Grants Writing Tool</title>
      </Head>
        <Flex align="center" marginBottom="1rem" marginTop={(sucessAlert || errorAlert) ? '20px' : '10px' } >
          <Text fontSize={size} fontWeight="bold">
            Update your Grant
          </Text>
        </Flex>
        <Text marginBottom={4} color="gray">
          Update your grant as you wish :)
        </Text>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <InputGroup>
            <InputLeftAddon children={<AiFillFileText />} />
            <Input
              type="text"
              placeholder="Update the title"
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
              placeholder="Update the amount"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </InputGroup>
        </FormControl>
        <FormControl marginTop={4} isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Update the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl marginTop={4} isRequired>
          <FormLabel>Criteria</FormLabel>
          <Textarea
            placeholder="Update the grant's criteria"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
          />
        </FormControl>
        <Divider my={6} />
        <Flex justifyContent="flex-end" marginTop={8}>
          <Button colorScheme="gray" marginRight={4} onClick={resetForm}>
            Reset
          </Button>
          <Button colorScheme="blue" onClick={() => {handleUpdateClick(grant_id)}}>
            Save
          </Button>
        </Flex>
    </>
  );
};

export default CreateGrant;
