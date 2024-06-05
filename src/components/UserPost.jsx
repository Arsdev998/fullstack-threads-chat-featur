import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";

const UserPost = ({ likes, replies, image, desc }) => {
  const [like, setLike] = useState(false);
  return (
    <Link to={"/guts/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          position="relative"
        >
          <Avatar size="md" name="gutss" src="/gutss.jpeg" />
          <Box w="1px" flex="1" bg={"gray.light"} my={2}></Box>
          <Box position={"relative"}>
            <Avatar
              size={"xs"}
              name="thorfin"
              src="/thorfin.jpeg"
              position={"absolute"}
              top={"0px"}
              left={"-11px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="Musashi"
              src="/musashi.jpeg"
              position={"absolute"}
              bottom={"0px"}
              right={"-2px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="eren"
              src="/eren.jpeg"
              position={"absolute"}
              bottom={"0px"}
              left={"2px"}
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                Guts Freedom
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{desc}</Text>
          {image && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={image} w={"full"} />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions liked={like} setLiked={setLike} />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {replies} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {likes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
