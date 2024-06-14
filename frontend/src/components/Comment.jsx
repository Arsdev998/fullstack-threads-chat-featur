import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";

const Comment = ({ reply ,lastReply}) => {
  return (
    <>
      <Flex gap={4} py={2} w={"full"}>
        <Avatar src={reply.userProfilePict} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fonstSize={"sm"} fontWeight={"bold"}>
              {reply.username}
            </Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
      </Flex>
      {!lastReply ? <Divider /> : null}
    </>
  );
};

export default Comment;
