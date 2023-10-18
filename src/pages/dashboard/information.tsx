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
              Tech Optimum&apos;s Grant Writing Support Resources
            </Heading>
            <Text fontSize="lg" textAlign="center">
              <strong>Tech Optimum&apos;s Objective: </strong> To provide
              quality programming education that will help students grow in the
              technology industry.
            </Text>
            <Text fontSize="lg" textAlign="center">
              <strong>Tech Optimum&apos;s Mission: </strong>Tech Optimum is
              committed to bridging the digital divide by providing an online
              learning platform, resources, and tools dedicated to computer
              science education for students across the globe
            </Text>
            <Divider />
            <Link
              fontSize={"18px"}
              fontWeight={"600"}
              href="https://docs.google.com/document/d/1sAPrPKICpG-6t7qq9ufuWc4SVuuw1pRgCnJevJ9MekI/edit?usp=sharing"
              target="_blank"
            >
              You can access our Business Plan here
            </Link>
            <Link
              fontSize={"18px"}
              fontWeight={"600"}
              href="https://docs.google.com/spreadsheets/d/1glddk6CexUxHDI_MTN3uVikYTqmEqENpyCfSkLiN8_k/edit?usp=sharing"
              target="_blank"
            >
              You can access our Budget Sheet here
            </Link>
            <Link
              fontSize={"18px"}
              fontWeight={"600"}
              href="https://drive.google.com/file/d/1SRjOhIPpeHCuNbV4PFbDFmWBAlCnSQWj/view?usp=sharing"
              target="_blank"
            >
              You can access Final Letter here
            </Link>
            <Link
              fontSize={"18px"}
              fontWeight={"600"}
              href="https://drive.google.com/file/d/1y3ckvU_t-8yVYe9MTTOZvfHD7l118A16/view?usp=sharing"
              target="_blank"
            >
              You can access our EIN document here
            </Link>
            <Divider />
            <Box>
              <Heading size="lg">Need someone to answer your question?</Heading>
              <Text>
                Please communicate through slack where our main form of
                communicatin is. If you have any questions, please contact the
                admins: Siddharth -{" "}
                <Link
                  fontWeight={"700"}
                  href={"mailto:siddharth@techoptimum.org"}
                >
                  siddharth@techoptimum.org
                </Link>
                and Aditya -
                <Link fontWeight={"700"} href={"mailto:aditya@techoptimum.org"}>
                  aditya@techoptimum.org
                </Link>
                .
              </Text>
            </Box>
            <Divider />
            <Button
              mt={6}
              colorScheme="blue"
              size="lg"
              w="100%"
              onClick={goToDashboard}
            >
              Get Started
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Information;
