import {
  Image,
  Link,
  HStack,
  useMediaQuery,
  Tooltip,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  ViewIcon,
  EditIcon,
  AttachmentIcon,
  TimeIcon,
} from "@chakra-ui/icons";

import { UserButton } from "@clerk/clerk-react";
import { useRouter } from "next/router";

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
  w="30px"  // Decrease the width
  h="auto"  // Keep the aspect ratio by setting height to "auto"
  ml="1rem"
  src="/logo.png"
  alt="TechOptimum"
  cursor="pointer"
  onClick={onToggle}
/>

      </Tooltip>

      {isSmallerThan500 ? (
        <>
          <HStack>
            <HStack mx="0.5rem">
              <NavLink href="/">Dashboard</NavLink>
              <NavLink href="/">Writing</NavLink>
              <NavLink href="/">Upload</NavLink>
              <NavLink href="/">History</NavLink>
            </HStack>
            <UserButton />
          </HStack>
        </>
      ) : (
        <Flex alignItems="center">
          <UserButton />
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              marginLeft="10px"
            />
            <MenuList>
              <MenuItem icon={<ViewIcon />} marginTop="0.5rem">
                Dashboard
              </MenuItem>
              <MenuItem icon={<EditIcon />}>Writing</MenuItem>
              <MenuItem icon={<AttachmentIcon />}>Upload</MenuItem>
              <MenuItem icon={<TimeIcon />}>History</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
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
