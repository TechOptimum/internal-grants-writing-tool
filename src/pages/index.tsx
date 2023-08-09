import { Center, Flex, Link, Text, VStack } from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) {
    return (
      <Center h="100%" w="100%">
        <Text fontSize="2xl" fontWeight="bold">
          Loading...
        </Text>
      </Center>
    );
  }
  if (!isSignedIn || !user) {
    return (
      <VStack>
        <NavBtn href="/sign-in">Sign In</NavBtn>
        <NavBtn href="/sign-up">Sign Up</NavBtn>
      </VStack>
    );
  } else {
    return (
      <VStack>
        <NavBtn href="/dashboard">Dashboard</NavBtn>
      </VStack>
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
