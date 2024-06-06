import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import Comment from "../components/Comment";

const PostPage = () => {
  const [like, setLike] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/guts.jpeg" size={"md"} name="Guts" />
          <Flex alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              Guts Freedom
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={1} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>I'm with my best friend</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image
          src={
            "https://i.pinimg.com/736x/77/ee/52/77ee525a6342edbd5a8722093123020a.jpg"
          }
          w={"full"}
        />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={like} setLiked={setLike} />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          237 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {1200 + (like ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
        </Flex>

        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      <Comment
        img={"/thorfin.jpeg"}
        cmn={"Nice Guts, we have no enemies😀"}
        name={"Thorfin"}
        date={'2h'}
      />
      <Comment
        img={"/musashi.jpeg"}
        cmn={"keep living calmly and peacefully my brother🙏"}
        name={"Musashi"}
        date={'1d'}
      />
    </>
  );
};

export default PostPage;
