import { Center } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <Center h="100%" w="100%">
    <SignIn path="/sign-in" routing="path" />
  </Center>
);

export default SignInPage;
