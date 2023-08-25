import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Divider,
  VStack,
  Flex,
  Image,
  Button,
  Link,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

const Information = () => {
  const router = useRouter();

  const goToDashboard = () => {
    void router.push("/dashboard");
  };
  return (
    <Container w="100%" alignSelf="center">
      <Flex h="100%" align="center" justifyContent="center">
        <Box flex={1} maxW="600px">
          <VStack spacing={8} align="stretch" py={8}>
            <Heading size="xl" textAlign="center" mb={4}>
              Welcome Tech Optimum&apos;s Grant Tool Platform
            </Heading>
            <Text fontSize="lg" textAlign="center">
              If you've stumbled upon this page and you don't have any idea
              what's happening please contact the administrator of this site.
              Otherwise, you must be a grant writer! Please click the button
              below to get started!
            </Text>
            <Button
              mt={6}
              colorScheme="blue"
              size="lg"
              w="100%"
              onClick={goToDashboard}
            >
              Get Started
            </Button>

            <Divider />

            <Box>
              <Heading size="lg">Need someone to answer your question?</Heading>
              <Text>
                Please communicate through slack where our main form of
                communicatin is. If you have any questions, please contact the
                admins who will be
                <Link
                  fontWeight={"700"}
                  href={"mailto:pranith@techoptimum.org"}
                >
                  {" "}
                  Pranith - pranith@techoptimum.org
                </Link>
                , Siddharth -{" "}
                <Link
                  fontWeight={"700"}
                  href={"mailto:siddharth@techoptimum.org"}
                >
                  siddharth@techoptimum.org
                </Link>
                , Aditya -
                <Link fontWeight={"700"} href={"mailto:aditya@techoptimum.org"}>
                  aditya@techoptimum.org
                </Link>
                .
              </Text>
            </Box>

            {/* Rest of the sections */}
            {/* Customize Applications, Collaborative Review, Automated Notifications, Track Progress */}

            <Box>
              <Heading size="lg">Ready to Get Started?</Heading>
              <Text>
                Revolutionize your grant creation process today. Sign up for our
                tool and experience the benefits of efficient grant management.
              </Text>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Information;
