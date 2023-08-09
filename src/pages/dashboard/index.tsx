import Head from "next/head";
import {
  Stack,
  Text,
  VStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Flex,
  Wrap,
} from "@chakra-ui/react";
import Layout from "~/components/Layout";

export default function Page() {
  return (
    <>
      <Head>
        <title>Dashboard | TechOptimum Grants Writing Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack w="100%" align="start">
        <Text fontSize="4xl" fontWeight="bold" mb="0.3rem">
          Latest Grants
        </Text>
        <Wrap>
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
        </Wrap>
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
