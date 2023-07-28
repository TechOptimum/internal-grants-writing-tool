import { Center } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <Center h={"100dvh"} w={"100dvw"}>
    <SignIn path="/sign-in" routing="path" />
  </Center>
);

export default SignInPage;
