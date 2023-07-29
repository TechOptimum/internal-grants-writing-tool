import {
  VStack,
  Box,
  Link,
  Icon,
  CloseButton,
  Fade,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import {
  BsChatLeftText,
  BsFileEarmarkText,
  BsPersonGear,
} from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import type { IconType } from "react-icons";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function SideBar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <VStack
      flexGrow={1}
      borderRight="1px solid"
      borderColor="gray.500"
      align="end"
    >
      <Box p="0.5rem">
        {isOpen ? (
          <Fade in={isOpen}>
            <CloseButton size="lg" color="gray.600" onClick={onToggle} />
          </Fade>
        ) : (
          <Fade in={!isOpen}>
            <Button p="0" onClick={onToggle} backgroundColor="transparent">
              <HamburgerIcon
                fontSize="xl"
                color="gray.600"
                backgroundColor="transparent"
              />
            </Button>
          </Fade>
        )}
      </Box>
      <VStack h="100%" justifyContent="space-between">
        <VStack
          h="100%"
          w="100%"
          py="1rem"
          px={isOpen ? "2rem" : "0"}
          transition="all"
          transitionDuration="0.5s"
          justify="space-between"
        >
          <VStack w="100%">
            <SideBtn href="/" icon={AiOutlineHome} isOpen={isOpen}>
              Home
            </SideBtn>
            <SideBtn href="/" icon={BsFileEarmarkText} isOpen={isOpen}>
              Grants
            </SideBtn>
            <SideBtn href="/" icon={BsChatLeftText} isOpen={isOpen}>
              Feedback
            </SideBtn>
            <SideBtn href="/" icon={FiSettings} isOpen={isOpen}>
              Settings
            </SideBtn>
          </VStack>
          <SideBtn href="/" icon={BsPersonGear} isOpen={isOpen}>
            User Settings
          </SideBtn>
        </VStack>
      </VStack>
    </VStack>
  );
}

const SideBtn = ({
  children,
  href,
  icon,
  isOpen,
}: {
  children: string;
  href: string;
  icon: IconType;
  isOpen: boolean;
}) => {
  return (
    <Tooltip
      label={children}
      placement="right"
      hasArrow
      isDisabled={isOpen ? true : false}
    >
      <Box
        w={isOpen ? "15rem" : "3.4rem"}
        px="0.2rem"
        py="0.6rem"
        transition="all"
        transitionDuration="0.7s"
      >
        <Link
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          href={href}
          p="0.7rem"
          borderRadius="0.4rem"
          fontWeight="bold"
          color="gray.600"
          _hover={{
            backgroundColor: "gray.100",
            color: "gray.800",
          }}
        >
          <Icon boxSize={6} as={icon} />
          {isOpen ? (
            <>
              <Fade in={isOpen}>{children}</Fade>
              <Box p="0.4rem" />
            </>
          ) : (
            ""
          )}
        </Link>
      </Box>
    </Tooltip>
  );
};
