import {
  Image,
  HStack,
  useMediaQuery,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";

import { UserButton } from "@clerk/clerk-react";

interface NavBarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function NavBar({ isOpen, onToggle }: NavBarProps) {
  const [isSmallerThan500] = useMediaQuery("(min-width: 501px)"); // Adjusted media query condition

  return (
    <HStack
      w="100%"
      px="1rem"
      py="0.9rem"
      align="center"
      justify="space-between"
      borderBottom="1px solid"
      borderColor="gray.500"
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
          bg="gray.800"
          borderRadius="8px"
          p="8px"
          fontSize="16px"
        >
          <Image
            w="25px"
            h="auto"
            ml={!isOpen ? "0" : "1.5rem"}
            src="/logo.png"
            alt="TechOptimum"
            cursor="pointer"
            onClick={onToggle}
            transitionDuration="500ms"
          />
        </Tooltip>
      </HStack>
      <UserButton />
    </HStack>
  );
}
