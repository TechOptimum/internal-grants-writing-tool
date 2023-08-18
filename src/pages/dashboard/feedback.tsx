import Head from "next/head";
import { Text } from "@chakra-ui/react";

export default function Page() {
  return (
    <>
      <Head>
        <title>Dashboard | TechOptimum Grants Writing Tool</title>
      </Head>
      <Text fontSize="5xl" fontWeight="bold" mb="0.3rem">
        How to get feedback after submitting a grant request?
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At ipsam
        quibusdam iure, quo nostrum vero tempora animi quos, velit eaque quae
        beatae harum voluptatem libero nobis assumenda maxime blanditiis ex.
      </Text>
    </>
  );
}
