import { Text, Center } from "@chakra-ui/react";
import Head from "next/head";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
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
