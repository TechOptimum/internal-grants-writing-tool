import React from "react";
import {
  Image,
  HStack,
  useMediaQuery,
  Tooltip,
  IconButton,
  useColorMode,
  Button,
  Flex,
} from "@chakra-ui/react";

import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import { UserButton } from "@clerk/clerk-react";

interface NavBarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function NavBar({ isOpen, onToggle }: NavBarProps) {
  const [isSmallerThan500] = useMediaQuery("(min-width: 501px)");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack
      w="100%"
      px="1rem"
      py="0.9rem"
      align="center"
      justify="space-between"
      borderBottom="1px solid"
      borderColor={colorMode === "light" ? "gray.500" : "gray.700"}
    >
      <HStack>
        {!isSmallerThan500 && (
          <IconButton
            aria-label="Open Navigation Menu"
            onClick={onToggle}
            icon={<HamburgerIcon />}
          />
        )}
        <Tooltip
          label={
            !isOpen ? "Open full navigation menu" : "Close full navigation menu"
          }
          placement="right"
          bg={colorMode === "light" ? "gray.800" : "gray.300"}
          borderRadius="8px"
          p="8px"
          fontSize="16px"
        >
          {colorMode === "light" ? (
            <Image
              w="25px"
              h="auto"
              ml={!isOpen ? "0" : "1.5rem"}
              src="/logo-whitemode.png"
              alt="TechOptimum"
              cursor="pointer"
              onClick={onToggle}
              transitionDuration="500ms"
            />
          ) : (
            <Image
              w="25px"
              h="auto"
              ml={!isOpen ? "0" : "1.5rem"}
              src="/logo-blackmode.png"
              alt="TechOptimum"
              cursor="pointer"
              onClick={onToggle}
              transitionDuration="500ms"
            />
          )}
        </Tooltip>
      </HStack>

      <Flex align="center">
        <UserButton />
        <Button onClick={toggleColorMode} ml="1rem">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </HStack>
  );
}
