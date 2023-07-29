import { type AppType } from "next/app";
import { api } from "~/utils/api";

import { ClerkProvider } from "@clerk/nextjs";

import { ChakraProvider } from "@chakra-ui/react";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <ClerkProvider>
        <Component {...pageProps} />
      </ClerkProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
