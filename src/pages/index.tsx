import Head from "next/head";
import { HStack, VStack, Box, Link, Icon } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { BsChatLeftText, BsFileEarmarkText } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import type { IconType } from "react-icons";
import NavBar from "~/components/NavBar";
import { chakra } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard | TechOptimum Grants Witing Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <chakra.div h="100dvh">
        <NavBar />
        <HStack h="100%">
          <VStack
            h="100%"
            w="20rem"
            borderRight="1px solid"
            borderColor="gray.500"
            justifyContent="space-between"
          >
            <VStack w="100%" py="3rem" justify="space-between">
              <VStack w="100%">
                <SideBtn href="/" icon={AiOutlineHome}>
                  Home
                </SideBtn>
                <SideBtn href="/" icon={BsFileEarmarkText}>
                  Grants
                </SideBtn>
                <SideBtn href="/" icon={BsChatLeftText}>
                  Feedback
                </SideBtn>
                <SideBtn href="/" icon={FiSettings}>
                  Settings
                </SideBtn>
              </VStack>
              {/* <SideBtn href="/" icon={FiSettings}>
              User Settings
            </SideBtn> */}
            </VStack>
          </VStack>
        </HStack>
      </chakra.div>
    </>
  );
}

const SideBtn = ({
  children,
  href,
  icon,
}: {
  children: string;
  href: string;
  icon: IconType;
}) => {
  return (
    <Box w="15rem" px="0.2rem" py="0.6rem">
      <Link
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        href={href}
        p="0.7rem"
        borderRadius="0.4rem"
        fontWeight="bold"
        color="gray.700"
        _hover={{
          backgroundColor: "gray.100",
          color: "gray.800",
        }}
      >
        <Icon boxSize={6} as={icon} />
        {children}
        <Box p="0.4rem" />
      </Link>
    </Box>
  );
};
