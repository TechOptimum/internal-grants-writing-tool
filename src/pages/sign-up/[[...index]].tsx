import { Center } from "@chakra-ui/react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <Center h="100%" w="100%">
    <SignUp path="/sign-up" routing="path" />
  </Center>
);

export default SignUpPage;
