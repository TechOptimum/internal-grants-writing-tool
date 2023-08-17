import Head from "next/head";
import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Wrap,
  ModalHeader,
  Flex,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CreateGrant from "~/components/CreateGrant";
import GrantPost from "~/components/GrantPostAdmin";
import { api } from "~/utils/api";

const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: grants, refetch: refetchGrants } =
    api.grants.getGrants.useQuery();

  const deleteGrant = api.grants.deleteGrant.useMutation({
    onSuccess: () => {
      void refetchGrants();
    },
  });

  const handleDeleteClick = async (id: string) => {
    try {
      await deleteGrant.mutateAsync({
        id,
      });

      alert("Deleted successfully");
    } catch (error) {
      console.error("Error deleting grant:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard | TechOptimum Grants Writing Tool</title>
      </Head>
      <>
        <Text fontSize="4xl" fontWeight="bold">
          Admin Portal
        </Text>
        <Text fontSize="lg" color={"grey"}>
          To create a new grant, press the + button at the bottom of your
          screen.
        </Text>
        <Flex justify="flex-end" position="fixed" bottom="20px" right="20px">
          <Button onClick={onOpen} size={"lg"}>
            <AddIcon />
          </Button>
        </Flex>
        <VStack w="100%" align="start">
          <Wrap w="100%" justify="center">
            {grants !== undefined ? (
              grants.length > 0 ? (
                grants.map((grant) => (
                  <GrantPost
                    key={grant.id}
                    title={grant.title}
                    amount={grant.amount}
                    criteria={grant.criteria}
                    description={grant.description}
                    onDelete={() => void handleDeleteClick(grant.id)}
                    grant_id={grant.id}
                    endDate={grant.endDate}
                    available={grant.available}
                  />
                ))
              ) : (
                <VStack>
                  <Text fontSize="3xl">No grants created yet...</Text>
                  <Text color="grey">
                    Do you want to create one? Make it with the + button
                  </Text>
                </VStack>
              )
            ) : (
              <Text>Loading grants...</Text>
            )}
          </Wrap>
        </VStack>
      </>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Text fontSize="3xl" fontWeight="bold">
              Create a Grant
            </Text>
            <Text marginBottom={4} color="gray" fontWeight="medium">
              Welcome to Tech Optimum&apos;s Grant Creation Tool. Fill out the
              form below to create a grant opportunity.
            </Text>
          </ModalHeader>
          <ModalBody pb={6}>
            <CreateGrant />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Admin;
