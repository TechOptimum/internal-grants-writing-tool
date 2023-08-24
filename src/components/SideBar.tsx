import React from "react";

import {
  VStack,
  Box,
  Icon,
  Fade,
  Tooltip,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  useMediaQuery,
  DrawerFooter,
  Divider,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

import { CloseIcon } from "@chakra-ui/icons";
import { AiOutlineHome } from "react-icons/ai";
import { BsChatLeftText, BsFileEarmarkText } from "react-icons/bs";
import { HiOutlineInformationCircle } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineAssignmentInd,
} from "react-icons/md";
import { PiUploadSimple } from "react-icons/pi";

import type { IconType } from "react-icons";
import { useUser } from "@clerk/nextjs";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideBar({ isOpen, onClose }: SideBarProps) {
  const [isSmallerThan500] = useMediaQuery("(max-width: 501px)");

  const { user, isLoaded, isSignedIn } = useUser();

  if (!user || !isLoaded || !isSignedIn) return null;

  if (isSmallerThan500) {
    return (
      <>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader
              borderBottomWidth="1px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <div>Navigation Menu</div>
              <CloseIcon onClick={onClose} cursor="pointer" />
            </DrawerHeader>
            <DrawerBody>
              <MobileNavLink
                href="/dashboard"
                icon={<AiOutlineHome size={20} />}
              >
                Home
              </MobileNavLink>
              <MobileNavLink
                href="/dashboard/grants"
                icon={<BsFileEarmarkText size={20} />}
              >
                Grants
              </MobileNavLink>
              <MobileNavLink
                href="/dashboard/feedback"
                icon={<BsChatLeftText size={20} />}
              >
                Feedback
              </MobileNavLink>
              {user.publicMetadata.admin ? (
                <>
                  <Divider colorScheme="red" />
                  <MobileNavLink
                    href="/dashboard/admin"
                    icon={<MdOutlineAdminPanelSettings />}
                  >
                    Admin Dashboard
                  </MobileNavLink>
                  <MobileNavLink
                    href="/dashboard/admin/uploads"
                    icon={<PiUploadSimple />}
                  >
                    Uploads
                  </MobileNavLink>
                  <MobileNavLink
                    href="/dashboard/admin/assigns"
                    icon={<MdOutlineAssignmentInd />}
                  >
                    Assigns
                  </MobileNavLink>
                </>
              ) : null}
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <MobileNavLink
                href="/dashboard"
                icon={<HiOutlineInformationCircle size={20} />}
              >
                Information
              </MobileNavLink>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      <VStack
        borderRight="1px solid"
        borderColor="gray.500"
        align="end"
        h="100%"
        flexShrink="1"
        justify="space-between"
      >
        <VStack
          h="100%"
          w="auto"
          py="1rem"
          px={isOpen && !isSmallerThan500 ? "2rem" : "0"}
          transition="all"
          transitionDuration="0.5s"
          justify="space-between"
        >
          <VStack w="100%">
            <SideBtn
              href="/dashboard"
              icon={AiOutlineHome}
              isOpen={isOpen}
              isSmallerThan500={isSmallerThan500}
            >
              Home
            </SideBtn>
            <SideBtn
              href="/dashboard/grants"
              icon={BsFileEarmarkText}
              isOpen={isOpen}
              isSmallerThan500={isSmallerThan500}
            >
              Grants
            </SideBtn>
            <SideBtn
              href="/dashboard/feedback"
              icon={BsChatLeftText}
              isOpen={isOpen}
              isSmallerThan500={isSmallerThan500}
            >
              Feedback
            </SideBtn>
            {user.publicMetadata.admin ? (
              <>
                <Divider colorScheme="red" />
                <SideBtn
                  href="/dashboard/admin"
                  icon={MdOutlineAdminPanelSettings}
                  isOpen={isOpen}
                  isSmallerThan500={isSmallerThan500}
                >
                  Admin Dashboard
                </SideBtn>
                <SideBtn
                  href="/dashboard/admin/uploads"
                  icon={PiUploadSimple}
                  isOpen={isOpen}
                  isSmallerThan500={isSmallerThan500}
                >
                  Uploads
                </SideBtn>
                <SideBtn
                  href="/dashboard/admin/assigns"
                  icon={MdOutlineAssignmentInd}
                  isOpen={isOpen}
                  isSmallerThan500={isSmallerThan500}
                >
                  Assigns
                </SideBtn>
              </>
            ) : null}
          </VStack>
          <SideBtn
            href="/dashboard/information"
            icon={HiOutlineInformationCircle}
            isOpen={isOpen}
            isSmallerThan500={isSmallerThan500}
          >
            Information
          </SideBtn>
        </VStack>
      </VStack>
    </>
  );
}

interface SideBtnProps {
  children: string;
  href: string;
  icon: IconType;
  isOpen: boolean;
  isSmallerThan500: undefined | boolean;
}

const SideBtn: React.FC<SideBtnProps> = ({
  children,
  href,
  icon,
  isOpen,
  isSmallerThan500,
}) => {
  return (
    <Tooltip
      label={children}
      placement="right"
      hasArrow
      isDisabled={isOpen || isSmallerThan500}
    >
      <Box
        w={isOpen && !isSmallerThan500 ? "15rem" : "3.4rem"}
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
          {isOpen && !isSmallerThan500 && (
            <>
              <Fade in={isOpen}>{children}</Fade>
              <Box p="0.4rem" />
            </>
          )}
        </Link>
      </Box>
    </Tooltip>
  );
};

const MobileNavLink = ({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) => {
  return (
    <Link
      px="2rem" // Added padding on the left and right
      py="1rem" // Added padding on the top and bottom
      fontSize="2xl"
      fontWeight="bold"
      display="flex"
      alignItems="center"
      textDecoration="none"
      color="gray.600"
      _hover={{
        color: "gray.800",
      }}
      href={href}
    >
      <Box
        boxSize="2rem" // Increased icon size
        mr="1rem" // Increased spacing
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {icon}
      </Box>
      {children}
    </Link>
  );
};
