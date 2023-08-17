import React, { useRef } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Flex,
  Divider,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { AiFillFileText } from "react-icons/ai";
import { api } from "~/utils/api";

const CreateGrant = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const criteriaRef = useRef<HTMLTextAreaElement>(null);

  const toast = useToast();

  const { refetch } = api.grants.getGrants.useQuery();

  const createGrant = api.grants.create.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const resetForm = () => {
    const refs = [titleRef, descriptionRef, endDateRef, amountRef, criteriaRef];
    refs.forEach((ref) => (ref.current ? (ref.current.value = "") : ""));
  };

  const handleSaveClick = () => {
    try {
      const refs = [
        titleRef,
        descriptionRef,
        endDateRef,
        amountRef,
        criteriaRef,
      ];

      for (const i of refs) {
        if (i.current) {
          if (i.current.value === "") {
            return;
          }
        } else {
          return;
        }
      }

      const title = titleRef.current ? titleRef.current.value : "";
      const amount = amountRef.current ? amountRef.current.value : "";
      const description = descriptionRef.current
        ? descriptionRef.current.value
        : "";
      const criteria = criteriaRef.current ? criteriaRef.current.value : "";
      const endDate = endDateRef.current
        ? new Date(endDateRef.current.value)
        : new Date();

      createGrant.mutate({
        title,
        amount: parseFloat(amount),
        description,
        criteria,
        endDate,
      });

      resetForm();

      toast({
        title: "Created grant successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error creating grant:", error);
      toast({
        title: "Error creating grant",
        description: "Check the logs for more information",
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
          <Input type="text" ref={titleRef} placeholder="Enter the title" />
        </InputGroup>
      </FormControl>
      <FormControl marginTop={4} isRequired>
        <FormLabel>Amount</FormLabel>
        <InputGroup>
          <InputLeftAddon>$</InputLeftAddon>
          <NumberInput min={1} w="100%">
            <NumberInputField ref={amountRef} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
      </FormControl>
      <FormControl marginTop={4} isRequired>
        <FormLabel>Description</FormLabel>
        <Textarea ref={descriptionRef} placeholder="Enter the description" />
      </FormControl>
      <FormControl marginTop={4} isRequired>
        <FormLabel>End Date</FormLabel>
        <Input type="date" ref={endDateRef} />
      </FormControl>
      <FormControl marginTop={4} isRequired>
        <FormLabel>Criteria</FormLabel>
        <Textarea ref={criteriaRef} placeholder="Enter the grant's criteria" />
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
