import Head from "next/head";
import NavBar from "~/components/NavBar";
import SideBar from "~/components/SideBar";
import { VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard | TechOptimum Grants Witing Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack align="start" justify="start" gap={0} h="100dvh">
        <NavBar />
        <SideBar />
      </VStack>
    </>
  );
}
