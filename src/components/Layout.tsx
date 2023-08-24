import Head from "next/head";
import NavBar from "~/components/NavBar";
import SideBar from "~/components/SideBar";
import { Box, HStack, VStack, useDisclosure } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

export default function Layout({ children }: { children: ReactNode }) {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const { pathname } = useRouter();
  const { isSignedIn } = useUser();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HStack align="stretch" h="100vh"   >
        {/(sign-in|sign-up)/.test(pathname) || !isSignedIn ? null : (
          <SideBar isOpen={isOpen} onClose={onClose} onToggle={onToggle} />
        )}
        <VStack align="start" justify="start" spacing={0} flex={1} overflow="auto">
          <NavBar onToggle={onToggle} isOpen={isOpen} />
          <Box
            w="100%"
            p={{ base: "1rem", sm: "2rem" }}
            overflow="visible"
            flex="1" // Allow the content to grow
          >
            {children}
          </Box>
        </VStack>
      </HStack>
    </>
  );
}
