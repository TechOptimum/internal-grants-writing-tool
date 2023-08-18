import Head from "next/head";
import { Center, Text, useDisclosure, VStack, Wrap } from "@chakra-ui/react";
import GrantAssign from "~/components/GrantAssign";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

const Admin = () => {
  const { onClose } = useDisclosure();

  const { data: assigns, refetch } = api.grants.getAllAssignedGrants.useQuery();

  const unassignGrant = api.grants.unassignGrant.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleUnassign = (id: string) => {
    unassignGrant.mutate({
      grantId: id,
    });
    onClose();
  };

  const { user, isLoaded, isSignedIn } = useUser();

  if (!user || !isLoaded || !isSignedIn) return null;

  if (!user.publicMetadata.admin) {
    return (
      <>
        <Head>
          <title>Page not found</title>
        </Head>
        <Center>403 - Unauthorized</Center>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard | TechOptimum Grants Writing Tool</title>
      </Head>
      <>
        <Text fontSize="4xl" fontWeight="bold">
          Assigned Grants
        </Text>
        <VStack w="100%" align="start">
          <Wrap w="100%" justify="center">
            {assigns !== undefined ? (
              assigns.length > 0 ? (
                assigns.map((assign) => (
                  <GrantAssign
                    key={assign.id}
                    onUnassign={(_event) => void handleUnassign(assign.id)}
                    userId={assign.assignedTo}
                    title={assign.title}
                    grantId={assign.id}
                  />
                ))
              ) : (
                <VStack>
                  <Text fontSize="3xl">No uploads were found.</Text>
                </VStack>
              )
            ) : (
              <Text>Loading uploads...</Text>
            )}
          </Wrap>
        </VStack>
      </>
    </>
  );
};

export default Admin;
