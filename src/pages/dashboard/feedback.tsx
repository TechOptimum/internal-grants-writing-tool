import Head from "next/head";
import { Text, Link } from "@chakra-ui/react";

export default function Page() {
  return (
    <>
      <Head>
        <title>Feedback | TechOptimum Grants Writing Tool</title>
      </Head>
      <Text fontSize="5xl" fontWeight="bold" mb="0.3rem">
        How to get feedback after submitting a grant request?
      </Text>
      <Text>
        Slack is our main form of communication we can dicuss your feedback. If
        you do not have access to Slack please contact the admins who will be
        Pranith -{" "}
        <Link fontWeight={"700"} href={"mailto:pranith@techoptimum.org"}>
          pranith@techoptimum.org
        </Link>
        , Siddharth -{" "}
        <Link fontWeight={"700"} href={"mailto:siddharth@techoptimum.org"}>
          siddharth@techoptimum.org
        </Link>
        , Aditya -
        <Link fontWeight={"700"} href={"mailto:aditya@techoptimum.org"}>
          aditya@techoptimum.org
        </Link>
        <div className=""></div>
      </Text>
    </>
  );
}
