import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNowStrict } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const Post = ({ post, postBy , onDelete }) => {
  const showToast = useShowToast();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userAtom);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postBy);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
        setUser(null);
      }
    };
    getUser();
  }, [postBy, showToast]);

  const handleDeletePost = async (e) => {
    try {
      e.preventDefault();
      if (!window.confirm("Are you sure want to delete this post?")) return;
      const res = await fetch(`/api/post/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      onDelete(post._id);
      showToast("Success", "Post deleted", "success");
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return (
    <Link to={`${user?.username}/post/${postBy}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          position="relative"
        >
          <Avatar
            size="md"
            name="gutss"
            cursor="pointer"
            src={user?.profilePict}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user?.username}`);
            }}
          />
          <Box w="1px" flex="1" bg={"gray.light"} my={2}></Box>
          <Box position={"relative"}>
            {post.replies.length === 0 && <Text align={"center"}>🥱</Text>}
            {post.replies[0] && (
              <Avatar
                size={"xs"}
                name={post.replies[0].username}
                src={post.replies[0].userProfilePict}
                position={"absolute"}
                top={"0px"}
                left={"-11px"}
                padding={"2px"}
              />
            )}
            {post.replies[1] && (
              <Avatar
                size={"xs"}
                name={post.replies[1].username}
                src={post.replies[1].userProfilePict}
                position={"absolute"}
                bottom={"0px"}
                right={"-2px"}
                padding={"2px"}
              />
            )}
            {post.replies[2] && (
              <Avatar
                size={"xs"}
                name={post.replies[2].username}
                src={post.replies[2].userProfilePict}
                position={"absolute"}
                bottom={"0px"}
                left={"2px"}
                padding={"2px"}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user?.username}`);
                }}
              >
                {user?.name}
              </Text>

              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text
                fontSize={"xs"}
                w={36}
                color={"gray.light"}
                whiteSpace="nowrap"
                overflow="hidden"
                textAlign="right"
                textOverflow="ellipsis"
              >
                {formatDistanceToNowStrict(new Date(post.createdAt))} ago
              </Text>
              {currentUser?._id === user?._id && (
                <DeleteIcon size={28} onClick={handleDeletePost} />
              )}
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{post.caption}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions post={post} />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
