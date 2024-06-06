import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const Comment = ({ img, cmn, name ,date }) => {
  const [like, setLike] = useState(false);
  return (
    <>
      <Flex gap={4} py={2} w={"full"}>
        <Avatar src={img} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fonstSize={"sm"} fontWeight={"bold"}>
              {name}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"} color={"dark.light"}>
                {date}
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text>{cmn}</Text>
          <Actions liked={like} setLiked={setLike} />
          <Text fontSize={"sm"} color={"gray.light"}>
            {30 + (like ? 1 : 0)} likes
          </Text>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default Comment;
