import React, { useState } from 'react';
import {
  Select,
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
  useToast
} from '@chakra-ui/react';
import { AiFillFileText } from 'react-icons/ai';
import {CloseIcon, CheckIcon} from '@chakra-ui/icons'
import Head from 'next/head';
import { api } from '~/utils/api';

interface CreateGrantProps {
  grant_id: string;
  initialTitle: string;
  initialAmount: number;
  initialDescription: string;
  initialCriteria: string;
  initialEndDate: Date;
}

const CreateGrant = ({
  grant_id,
  initialAmount,
  initialCriteria,
  initialDescription,
  initialTitle,
  initialEndDate,
}: CreateGrantProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [amount, setAmount] = useState(initialAmount);
  const [criteria, setCriteria] = useState(initialCriteria);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [available, setAvailable] = useState(Boolean);

  const toast = useToast()

  const { refetch } = api.grants.getGrants.useQuery();

  const size = '3xl';

  const updateGrant = api.grants.updateGrant.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const resetForm = () => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setAmount(initialAmount);
    setCriteria(initialCriteria);
    setEndDate(initialEndDate);
  };

  const removeAvailability = () => {
    toast({
      title: "Setted your changes to the availablity to false",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    setAvailable(false)
  }

  const addAvailability = () => {
    toast({
      title: "Setted your changes to the availablity to true",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    setAvailable(true)
  }

  const handleUpdateClick = async (id: string) => {
    try {

        if(!title || description || endDate || amount || criteria) {
          toast({
            title: "There are field(s) that are missing text, please fill them out ",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }

      await updateGrant.mutateAsync({
        title,
        amount,
        description,
        criteria,
        id,
        endDate,
        available,
      });

      toast({
        title: "Updated grant successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error creating grant:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Grant Update | TechOptimum Grants Writing Tool</title>
      </Head>
      <Flex align="center" marginBottom="1rem">
        <Text fontSize={size} fontWeight="bold">
          Update a Grant
        </Text>
      </Flex>
      <Text marginBottom={4} color="gray">
        Update the grant as you wish!
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
          <InputLeftAddon children="$" />
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
      <FormControl marginTop={4} isRequired>
        <FormLabel>End Date</FormLabel>
        <Input
          type="date"
          value={endDate ? new Date(endDate).toLocaleDateString('en-CA') : ''}
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
      </FormControl>
      <FormControl marginTop={4} isRequired>
        <FormLabel>Toggle Availability</FormLabel>
        <Button onClick={addAvailability} colorScheme='green' marginRight={2}> 
          <CheckIcon />
        </Button>
        <Button onClick={removeAvailability} colorScheme='red'>
          <CloseIcon />
        </Button>
      </FormControl>
      <Divider my={6} />
      <Flex justifyContent="flex-end" marginTop={8}>
        <Button colorScheme="gray" marginRight={4} onClick={resetForm}>
          Reset
        </Button>
        <Button colorScheme="blue" onClick={() => handleUpdateClick(grant_id)}>
          Save
        </Button>
      </Flex>
    </>
  );
};

export default CreateGrant;