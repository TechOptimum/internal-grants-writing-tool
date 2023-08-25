import { Center, Link, Text, VStack } from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";

export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) {
    return (
      <>
        <Head>
          <title>Loading...</title>
          <meta
            name="description"
            content="Tech Optimum's grant tool platform"
          />
        </Head>
        <Center h="100%" w="100%">
          <Text fontSize="2xl" fontWeight="bold">
            Loading...
          </Text>
        </Center>
      </>
    );
  }
  if (!isSignedIn || !user) {
    return (
      <>
        <Head>
          <title>Sign in/up</title>
          <meta
            name="description"
            content="Tech Optimum's grant tool platform"
          />
        </Head>
        <VStack>
          <NavBtn href="/sign-in">Sign In</NavBtn>
          <NavBtn href="/sign-up">Sign Up</NavBtn>
        </VStack>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Dashboard</title>
          <meta
            name="description"
            content="Tech Optimum's grant tool platform"
          />
        </Head>
        <VStack>
          <NavBtn href="/dashboard">Dashboard</NavBtn>
        </VStack>
      </>
    );
  }
}

const NavBtn = ({ href, children }: { href: string; children: string }) => {
  return (
    <Link fontSize="xl" textDecoration="underline" href={href}>
      {children}
    </Link>
  );
};
