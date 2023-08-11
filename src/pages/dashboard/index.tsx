import Head from "next/head";
import {
  Stack,
  Text,
  VStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Wrap,
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

export default function Page() {
  return (
    <>
      <Head>
        <title>Dashboard | TechOptimum Grants Writing Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack w="100%" align="start">
        <Text fontSize="5xl" fontWeight="bold" mb="0.3rem">
          Latest Grants
        </Text>
        <Wrap w="100%">
          <Grant
            title="Grant Opportunity For Project"
            description="Grant Opportunity For Specific Project :)"
            footer="Available until October 13th, 2023"
          />
          <Grant
            title="Grant Opportunity For Other Project"
            description="Grant Opportunity For Not So Specific Project :("
            footer="Available until August 29th, 2023"
          />
          <Grant
            title="Grant Opportunity For Certain Projects"
            description="Yep..."
            footer="Available until November 11th, 2023"
          />
        </Wrap>
      </VStack>
    </>
  );
}

const Grant = ({
  title,
  description,
  footer,
}: {
  title: string;
  description: string;
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
              <CardHeader fontSize="xl" fontWeight="bold">
                {title}
              </CardHeader>
              <CardFooter color="blackAlpha.700" fontWeight="medium">
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequuntur nobis atque, aperiam reprehenderit tempora enim
            architecto sequi optio, laboriosam, dolorum voluptatibus iste sunt
            ipsam. Soluta minus aut maxime voluptatibus totam.
          </ModalBody>

          <ModalFooter>
            <HStack justify="space-between" w="100%">
              <Text>{footer}</Text>
              <HStack>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
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
