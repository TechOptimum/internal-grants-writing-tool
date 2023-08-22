import React, { useRef } from "react";
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
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const criteriaRef = useRef<HTMLTextAreaElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const availableRef = useRef<HTMLInputElement>(null);

  const toast = useToast();

  const { refetch } = api.grants.getGrants.useQuery();

  const size = "3xl";

  const updateGrant = api.grants.updateGrant.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const resetForm = () => {
    const refs = [
      titleRef,
      descriptionRef,
      amountRef,
      criteriaRef,
      endDateRef,
      availableRef,
    ];
    if (refs.every((ref) => ref.current)) {
      if (titleRef.current) titleRef.current.value = initialTitle;
      if (descriptionRef.current)
        descriptionRef.current.value = initialDescription;
      if (amountRef.current) amountRef.current.value = initialAmount.toString();
      if (criteriaRef.current) criteriaRef.current.value = initialCriteria;
      if (endDateRef.current)
        endDateRef.current.value = initialEndDate.toDateString();
      if (availableRef.current)
        availableRef.current.checked = initialAvailability;
    }
  };

  const handleUpdateClick = (id: string) => {
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
      const amount = amountRef.current
        ? Number(amountRef.current.value)
        : Number(0);
      const description = descriptionRef.current
        ? descriptionRef.current.value
        : "";
      const criteria = criteriaRef.current ? criteriaRef.current.value : "";
      const endDate = endDateRef.current
        ? new Date(endDateRef.current.value)
        : new Date();
      const available = availableRef.current
        ? availableRef.current.checked
        : true;

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
          <InputLeftAddon>
            <AiFillFileText />
          </InputLeftAddon>
          <Input type="text" placeholder="Update the title" ref={titleRef} />
        </InputGroup>
      </FormControl>
      <FormControl marginTop={4} isRequired>
        <FormLabel>Amount</FormLabel>
        <InputGroup>
          <InputLeftAddon>$</InputLeftAddon>
          <Input
            type="number"
            placeholder="Update the amount"
            ref={amountRef}
          />
        </InputGroup>
      </FormControl>
      <FormControl marginTop={4} isRequired>
        <FormLabel>Description</FormLabel>
        <Textarea placeholder="Update the description" ref={descriptionRef} />
      </FormControl>
      <FormControl marginTop={4} isRequired>
        <FormLabel>Criteria</FormLabel>
        <Textarea placeholder="Update the grant's criteria" ref={criteriaRef} />
      </FormControl>
      <FormControl marginTop={4} isRequired>
        <FormLabel>End Date</FormLabel>
        <Input type="date" ref={endDateRef} />
      </FormControl>
      <FormControl marginTop={4} isRequired>
        <FormLabel>Toggle Availability</FormLabel>
        <Switch defaultChecked={initialAvailability} />
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
