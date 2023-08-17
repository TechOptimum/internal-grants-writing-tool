import Head from "next/head";
import {
  Stack,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { api } from "~/utils/api";

export default function Page() {
  const { data } = api.grants.getGrants.useQuery();

  return (
    <>
      <Head>
        <title>Dashboard | TechOptimum Grants Writing Tool</title>
      </Head>
      <Text fontSize="5xl" fontWeight="bold" mb="0.3rem">
        Latest Grants
      </Text>
      {data ? (
        data.map(
          (grant) =>
            grant.available && (
              <Grant
                key={grant.id}
                title={grant.title}
                description={grant.description}
                criteria={grant.criteria}
                amount={grant.amount}
                footer={"Available until " + grant.endDate.toLocaleDateString()}
              />
            )
        )
      ) : (
        <Text>Loading grants...</Text>
      )}
    </>
  );
}

const Grant = ({
  title,
  description,
  criteria,
  amount,
  footer,
}: {
  title: string;
  description: string;
  criteria: string;
  amount: number;
  footer: string;
}) => {
  const [isGroupHover, setIsGroupHover] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button h="auto" p="0px" my="0.3rem" w="100%" onClick={onOpen}>
        <Card
          size="sm"
          variant="outline"
          w="100%"
          transitionDuration="100ms"
          _hover={{
            backgroundColor: "rgb(240,240,240)",
          }}
          onMouseEnter={() => setIsGroupHover(true)}
          onMouseLeave={() => setIsGroupHover(false)}
        >
          <HStack justify="space-between" pe="1rem">
            <Stack>
              <CardHeader fontSize="xl" fontWeight="bold" textAlign="start">
                {title}
              </CardHeader>
              <CardBody textAlign="start">Amount: ${amount}</CardBody>
              <CardFooter
                color="blackAlpha.700"
                fontWeight="medium"
                textAlign="start"
              >
                {footer}
              </CardFooter>
            </Stack>
            <Box
              transitionDuration="100ms"
              transform={isGroupHover ? "translateX(5px)" : "translateX(0px)"}
            >
              <ArrowRightIcon />
            </Box>
          </HStack>
        </Card>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="xl" fontWeight="bold">
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {description}
            <br />
            <br />
            Criteria: {criteria}
            <br />
            Amount: ${amount}
          </ModalBody>

          <ModalFooter>
            <HStack justify="space-between" w="100%">
              <Text>{footer}</Text>
              <HStack>
                <Button colorScheme="blue" mr={3}>
                  Start Grant
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </HStack>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
