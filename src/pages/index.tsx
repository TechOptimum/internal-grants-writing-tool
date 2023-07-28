import Head from "next/head";
import { HStack, VStack, Button, Box, Link } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard | TechOptimum Grants Witing Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HStack h="100%">
        <VStack
          h="100%"
          w="20rem"
          borderRight="1px solid"
          borderColor="gray.500"
        >
          <SideBtn>Home</SideBtn>
        </VStack>
      </HStack>
    </>
  );
}

const SideBtn = ({ children }: { children: string }) => {
  return (
    <Box w="100%" p="0.4rem">
      <Link href="/" w="100%" p="0.4rem" border="1px solid" borderColor="black">
        {children}
      </Link>
    </Box>
  );
};
