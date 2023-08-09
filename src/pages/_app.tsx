import { type AppType } from "next/app";
import { api } from "~/utils/api";

import { ClerkProvider } from "@clerk/nextjs";

import { ChakraProvider } from "@chakra-ui/react";
import Layout from "~/components/Layout";

import "~/styles/globals.css";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <ClerkProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ClerkProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(App);
