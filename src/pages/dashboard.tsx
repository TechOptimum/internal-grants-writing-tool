import { Text, Center } from "@chakra-ui/react";
import Head from "next/head";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Dashboard | TechOptimum Grants Witing Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h={"100dvh"} w={"100dvw"}>
        <Text fontSize={"6xl"} color={"black"} fontWeight={"bold"}>
          {hello.data?.greeting}
        </Text>
      </Center>
    </>
  );
}
