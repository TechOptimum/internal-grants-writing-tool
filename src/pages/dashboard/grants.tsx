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
  Divider,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types";
import { UploadButton } from "~/components/utils/uploadthing";

export default function Page() {
  const { isLoaded, user } = useUser();

  if (!isLoaded || !user) return null;

  const { data } = api.grants.getAssignedGrants.useQuery({ userId: user.id });

  return (
    <>
      <Head>
        <title>Grants | TechOptimum Grants Writing Tool</title>
      </Head>
      <Text fontSize="5xl" fontWeight="bold" mb="0.3rem">
        Assigned Grants
      </Text>
      {data ? (
        data.map((grant) => (
          <Grant
            key={grant.id}
            id={grant.id}
            title={grant.title}
            description={grant.description}
            criteria={grant.criteria}
            amount={grant.amount}
            footer={"Available until " + grant.endDate.toLocaleDateString()}
            user={user}
          />
        ))
      ) : (
        <Text>Loading grants...</Text>
      )}
    </>
  );
}

const Grant = ({
  id,
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

  const grantUpload = api.grants.createUpload.useMutation();

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
            <Box w="100%">
              {description}
              <br />
              <br />
              Criteria: {criteria}
              <br />
              Amount: ${amount}
              <br />
              <br />
              Once you&apos;re done writing your grant request, you may upload
              it here. After that please wait until we reach out to you on
              Slack.
            </Box>
            <Divider colorScheme="blackAlpha" px="1rem" />
            <UploadButton
              endpoint="documentUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                if (!res) return;
                if (!res[0]) return;
                console.log("Files: ", res);
                grantUpload.mutate({
                  name: res[0].name,
                  grantId: id,
                  url: res[0].url,
                });
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
            <Divider />
            <Text>
              If the upload button doesn&apos;t load, try closing the modal and
              reopen it again. If not, refresh the page.
            </Text>
          </ModalBody>

          <ModalFooter>
            <HStack justify="space-between" w="100%">
              <Text>{footer}</Text>
              <HStack>
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
