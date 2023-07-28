import { type AppType } from "next/app";
import { api } from "~/utils/api";

import { ClerkProvider } from "@clerk/nextjs";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "~/styles/theme";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <ClerkProvider>
        <Component {...pageProps} />
      </ClerkProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
