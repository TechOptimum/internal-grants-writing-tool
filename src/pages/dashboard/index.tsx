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
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types";
import { useRouter } from "next/router";

export default function Page() {
  const { data } = api.grants.getGrants.useQuery();
  const { isLoaded, user } = useUser();

  if (!isLoaded || !user) return null;

  return (
    <>
      <Head>
        <title>Dashboard | TechOptimum Grants Writing Tool</title>
        <meta name="description" content="Tech Optimum Grants Writing Tool" />
      </Head>
      <Text fontSize="5xl" fontWeight="bold" mb="0.3rem">
        Latest Grants
      </Text>
      {data ? (
        data.filter((grant) => grant.available).length > 0 ? (
          data.map(
            (grant) =>
              grant.available && (
                <Grant
                  key={grant.id}
                  id={grant.id}
                  title={grant.title}
                  description={grant.description}
                  criteria={grant.criteria}
                  amount={grant.amount}
                  footer={
                    "Available until " + grant.endDate.toLocaleDateString()
                  }
                  user={user}
                />
              )
          )
        ) : (
          <>
            <Head>
              <title>No Grants for now | TechOptimum Grants Writing Tool</title>
              <meta
                name="description"
                content="Tech Optimum Grants Writing Tool"
              />
            </Head>
            <Text>No grants for now.</Text>
          </>
        )
      ) : (
        <>
          <Head>
            <title>Loading Grants... | TechOptimum Grants Writing Tool</title>
            <meta
              name="description"
              content="Tech Optimum Grants Writing Tool"
            />
          </Head>
          <Text>Loading grants...</Text>
        </>
      )}
    </>
  );
}

const Grant = ({
  id,
  user,
  title,
  description,
  criteria,
  amount,
  footer,
}: {
  id: string;
  user: UserResource;
  title: string;
  description: string;
  criteria: string;
  amount: number;
  footer: string;
}) => {
  const [isGroupHover, setIsGroupHover] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hoverColor = useColorModeValue("rgb(240,240,240)", "whiteAlpha.100");
  const availabilityColor = useColorModeValue(
    "blackAlpha.700",
    "whiteAlpha.500"
  );

  const router = useRouter();

  const assignGrant = api.grants.assignGrant.useMutation();

  const startGrant = () => {
    assignGrant.mutate({
      userId: user.id,
      grantId: id,
    });
    void router.push("/dashboard/grants");
  };

  return (
    <>
      <Button h="auto" p="0px" my="0.3rem" w="100%" onClick={onOpen}>
        <Card
          size="sm"
          variant="outline"
          w="100%"
          transitionDuration="100ms"
          _hover={{
            backgroundColor: hoverColor,
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
                color={availabilityColor}
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
                <Button colorScheme="blue" mr={3} onClick={startGrant}>
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
