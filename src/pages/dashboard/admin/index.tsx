import Head from "next/head";
import { api } from "~/utils/api";
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
  HStack,
  Box,
  ModalHeader,
  Flex,
} from "@chakra-ui/react";
import CreateGrant from "~/components/CreateGrant";
import GrantPost from "~/components/GrantPost";

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
      <Box w="100%">
        <HStack w="100%" justify="space-between">
          <Text fontSize="4xl" fontWeight="bold">
            Manage Grants
          </Text>
          <Button onClick={onOpen}>Create a grant</Button>
        </HStack>

        <VStack w="100%" align="start">
          <Wrap w="100%" justify="center">
            {" "}
            {/* Set justify prop to center */}
            {grants ? (
              <>
                {grants.map((grant) => (
                  <GrantPost
                    key={grant.id}
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
      </Box>
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
