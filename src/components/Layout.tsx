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
      <VStack align="start" justify="start" gap={0} h="100dvh">
        <NavBar onToggle={onToggle} isOpen={isOpen} />
        <HStack flexShrink="1" h="100%" w="100%">
          {!/(sign-in|sign-up)/.test(pathname) && isSignedIn && (
            <SideBar isOpen={isOpen} onClose={onClose} />
          )}
          <Box
            h="100%"
            w="100%"
            p={{ base: "1rem", sm: "2rem" }}
            overflow="visible"
            flexShrink="1"
          >
            <VStack align="start">{children}</VStack>
          </Box>
        </HStack>
      </VStack>
    </>
  );
}
