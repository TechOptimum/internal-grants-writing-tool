import Head from "next/head";
import { Center, Text, useDisclosure, VStack, Wrap } from "@chakra-ui/react";
import GrantUpload from "~/components/GrantUpload";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

const Admin = () => {
  const { onClose } = useDisclosure();

  const { data: uploads, refetch } = api.grants.getUploads.useQuery();

  const deleteUploadMutation = api.grants.deleteUpload.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleUploadDelete = (id: string, name: string) => {
    deleteUploadMutation.mutate({
      id,
      name,
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
          Grant Writer Uploads
        </Text>
        <VStack w="100%" align="start">
          <Wrap w="100%" justify="center">
            {uploads !== undefined ? (
              uploads.length > 0 ? (
                uploads.map((upload) => (
                  <GrantUpload
                    key={upload.id}
                    id={upload.id}
                    onDelete={(_event) =>
                      void handleUploadDelete(upload.id, upload.name)
                    }
                    name={upload.name}
                    userId={upload.userId}
                    title={upload.grant.title}
                    grantId={upload.grantId}
                    url={upload.url}
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
