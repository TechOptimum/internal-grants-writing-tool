import { type AppType } from "next/app";
import { api } from "~/utils/api";

import { ClerkProvider } from "@clerk/nextjs";

import { ChakraProvider } from "@chakra-ui/react";

import { chakra } from "@chakra-ui/react";
import NavBar from "~/components/NavBar";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <ClerkProvider>
        <chakra.div h="100dvh">
          <NavBar />
          <Component {...pageProps} />
        </chakra.div>
      </ClerkProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
