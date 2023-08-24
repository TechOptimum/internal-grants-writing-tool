import React, { useState } from "react";
import {
  Switch,
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
  useToast,
} from "@chakra-ui/react";
import { AiFillFileText } from "react-icons/ai";
import Head from "next/head";
import { api } from "~/utils/api";

interface CreateGrantProps {
  grant_id: string;
  initialTitle: string;
  initialAmount: number;
  initialDescription: string;
  initialCriteria: string;
  initialEndDate: Date;
  initialAvailability: boolean;
}

const UpdateGrant = ({
  grant_id,
  initialAmount,
  initialCriteria,
  initialDescription,
  initialTitle,
  initialEndDate,
  initialAvailability,
}: CreateGrantProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [amount, setAmount] = useState(initialAmount);
  const [description, setDescription] = useState(initialDescription);
  const [criteria, setCriteria] = useState(initialCriteria);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [available, setAvailable] = useState(initialAvailability);

  const toast = useToast();

  const { refetch } = api.grants.getGrants.useQuery();


  const updateGrant = api.grants.updateGrant.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const resetForm = () => {
    setTitle(initialTitle);
    setAmount(initialAmount);
    setDescription(initialDescription);
    setCriteria(initialCriteria);
    setEndDate(initialEndDate);
    setAvailable(initialAvailability);
  };

  const handleUpdateClick = (id: string) => {
    try {
      if (!title || !description || !endDate) {
        return;
      }

      updateGrant.mutate({
        title,
        amount,
        description,
        criteria,
        id,
        endDate,
        available,
      });

      toast({
        title: "Updated grant successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating grant:", error);
      toast({
        title: "Something went wrong.",
        description: "Check the logs for more information.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <FormControl isRequired>
        <FormLabel>Title</FormLabel>
        <InputGroup>
          <InputLeftAddon>
            <AiFillFileText />
          </InputLeftAddon>
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
          <InputLeftAddon>$</InputLeftAddon>
          <Input
            type="number"
            placeholder="Update the amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
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
          value={endDate.toISOString().split("T")[0]}
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
      </FormControl>
      <FormControl marginTop={4} isRequired>
        <FormLabel>Toggle Availability</FormLabel>
        <Switch
          defaultChecked={initialAvailability}
          onChange={() => setAvailable(!available)}
        />
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

export default UpdateGrant;
