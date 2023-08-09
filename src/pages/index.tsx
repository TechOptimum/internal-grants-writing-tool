import Head from "next/head";
import NavBar from "~/components/NavBar";
import SideBar from "~/components/SideBar";
import {
  HStack,
  Stack,
  Text,
  VStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Flex,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";

export default function Home() {
  const {isOpen, onToggle, onClose} = useDisclosure()



  return (
    <>
      <Head>
        <title>Dashboard | TechOptimum Grants Writing Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack align="start" justify="start" gap={0} h="100dvh">
        <NavBar onToggle={onToggle} isOpen={isOpen}  />
        <HStack flexGrow={1} h="100dvh" w="100dvw">
          <SideBar isOpen={isOpen} onClose={onClose} />
          <HStack
            h="100%"
            w="100%"
            p="2rem"
            justify="space-evenly"
            align="start"
          >
            <Stack w="50%">
              <Text fontSize="4xl" fontWeight="bold" mb="0.3rem">
                Latest Grants
              </Text>
              <Grant
                title="Grant Opportunity For Project"
                description="Grant Opportunity For Specific Project :)"
                time="Today at 13:20"
                imgUrl="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              />
              <Grant
                title="Grant Opportunity For Other Project"
                description="Grant Opportunity For Not So Specific Project :("
                time="Yesterday at 11:18"
                imgUrl="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.acuity.com%2Fbinaries%2Fcontent%2Fgallery%2Facuitycms%2Fblogs%2Facuity-focus%2Fpaperwork.png&f=1&nofb=1&ipt=b49bb2637aa6665b8089606c770e3bf875cb5d286c360dbbc095c9d82aa2ed9d&ipo=images"
              />
            </Stack>
            <Stack w="50%">
              <Text fontSize="4xl" fontWeight="bold" mb="0.3rem">
                Pending Feedback
              </Text>
              <Feedback
                title="Grant Draft"
                description="Request for grant opportunity"
                user="John Smith"
                time="Today at 13:50"
                imgUrl=""
              />
            </Stack>
          </HStack>
        </HStack>
      </VStack>
    </>
  );
}

const Grant = ({
  title,
  description,
  time,
  imgUrl,
}: {
  title: string;
  description: string;
  time: string;
  imgUrl: string;
}) => {
  return (
    <Card size="sm" overflow="hidden" variant="outline" my="0.2rem">
      <Flex>
        <Image
          src={imgUrl}
          alt={title}
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
        />
        <Stack>
          <CardHeader>
            <Text fontSize="xl" fontWeight="semibold">
              {title}
            </Text>
          </CardHeader>
          <CardBody>
            <Text fontSize="md">{description}</Text>
          </CardBody>
          <CardFooter>
            <Text fontSize="sm" color="gray.500">
              {time}
            </Text>
          </CardFooter>
        </Stack>
      </Flex>
    </Card>
  );
};

const Feedback = ({
  title,
  description,
  time,
  user,
  imgUrl,
}: {
  title: string;
  description: string;
  time: string;
  user: string;
  imgUrl: string;
}) => {
  return (
    <Card size="sm" overflow="hidden" variant="outline" my="0.2rem">
      <Stack>
        <CardHeader>
          <Stack direction="row" align="center">
            <Avatar name={user} src={imgUrl} />
            <Text fontSize="xl" fontWeight="semibold">
              {user}
            </Text>
          </Stack>
        </CardHeader>
        <CardBody>
          <Text fontSize="2xl" fontWeight="semibold" mb="0.3rem">
            {title}
          </Text>
          <Text fontSize="lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
            inventore, eos sunt itaque, perspiciatis id exercitationem deserunt
            vero explicabo a neque laborum. Eum dignissimos vitae dolore ratione
            voluptatum, esse amet?
          </Text>
        </CardBody>
        <CardFooter>
          <Text fontSize="sm" color="gray.500">
            {time}
          </Text>
        </CardFooter>
      </Stack>
    </Card>
  );
};
