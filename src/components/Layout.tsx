import Head from "next/head";
import NavBar from "~/components/NavBar";
import SideBar from "~/components/SideBar";
import { HStack, VStack, useDisclosure } from "@chakra-ui/react";
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
        <title>Dashboard | TechOptimum Grants Writing Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack align="start" justify="start" gap={0} h="100dvh">
        <NavBar onToggle={onToggle} isOpen={isOpen} />
        <HStack flexGrow={1} h="100dvh" w="100dvw">
          {!/(sign-in|sign-up)/.test(pathname) && isSignedIn && (
            <SideBar isOpen={isOpen} onClose={onClose} />
          )}
          <HStack
            h="100%"
            w="100%"
            p="2rem"
            justify="space-evenly"
            align="start"
          >
            {children}
          </HStack>
        </HStack>
      </VStack>
    </>
  );
}
