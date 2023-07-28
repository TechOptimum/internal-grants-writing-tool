import { Image, Link, HStack, Avatar } from "@chakra-ui/react";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function NavBar() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <HStack
      w="100%"
      px="1rem"
      py="0.7rem"
      align="center"
      justify="space-between"
      borderBottom="1px solid"
      borderColor="gray.500"
    >
      <Image w="120px" ml="1rem" src="/logo.png" alt="TechOptimum" />
      <HStack>
        <HStack mx="0.5rem">
          <NavLink href="/">Dashboard</NavLink>
          <NavLink href="/">Writing</NavLink>
          <NavLink href="/">Upload</NavLink>
          <NavLink href="/">History</NavLink>
        </HStack>
        {isSignedIn && isLoaded && user ? (
          <Avatar size="sm" src={user.imageUrl} />
        ) : (
          <Link href="/sign-in">Sign In</Link>
        )}
      </HStack>
    </HStack>
  );
}

const NavLink = ({ href, children }: { href: string; children: string }) => {
  const { pathname } = useRouter();
  const color =
    (pathname == "/" && children.toLowerCase() == "dashboard") ||
    pathname == children.toLowerCase()
      ? "blackAlpha.800"
      : "gray.500";
  const fontWeight =
    (pathname == "/" && children.toLowerCase() == "dashboard") ||
    pathname == children.toLowerCase()
      ? "semibold"
      : "semibold";
  return (
    <Link
      px="0.5rem"
      fontSize="md"
      fontWeight={fontWeight}
      textDecoration="underline"
      textDecorationColor="transparent"
      textDecorationThickness="0px"
      __css={{
        textDecorationSkipInk: "none",
      }}
      transition="0.2s"
      _hover={{
        transform: "translateY(-2px)",
        textDecorationThickness: "2px",
        textUnderlineOffset: "3px",
        textDecorationColor: color,
        textDecorationSkipInk: "none",
      }}
      color={color}
      href={href}
    >
      {children}
    </Link>
  );
};
