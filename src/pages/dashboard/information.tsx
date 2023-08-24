import React from 'react';
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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Information = () => {
  const router = useRouter()
  const goToDashboard = () => {
    void router.push("/dashboard")
  }
  return (
    <Container w="100%" alignSelf="center">
      <Flex h="100%" align="center" justifyContent="center">
        <Box flex={1} maxW="600px">
          <VStack spacing={8} align="stretch" py={8}>
            <Heading size="xl" textAlign="center" mb={4}>
              Welcome to internal grants tool creation
            </Heading>
            <Text fontSize="lg" textAlign="center">
              This tool empowers students by giving them a platform to easily find the best grants available, hand picked by our qualified Grant Writers
            </Text>
            <Button mt={6} colorScheme="blue" size="lg" w="100%" onClick={goToDashboard}>
              Get Started
            </Button>

            <Divider />

            <Box>
              <Heading size="lg">Streamline Grant Creation</Heading>
              <Text>
                Our tool provides an intuitive and user-friendly interface that
                simplifies the grant creation process. Easily define grant
                criteria, requirements, and deadlines for efficient grant
                management.
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
