import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import React, { useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  useToast,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const UserHeader = ({ user }) => {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [update, setUpdate] = useState(false);
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );

  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({ description: "Profile Link Copied" });
    });
  };

  const handleFollow = async () => {
    if (!currentUser) {
      showToast("Please login to follow this user");
      return;
    }
    if(update) return
    setUpdate(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      if (following) {
        showToast("Success", `Unfollowed ${user.name}`, "success");
        user.followers.pop();
      } else {
        showToast("Success", `Followed ${user.name}`, "success");
        user.followers.push(currentUser?._id);
      }
      setFollowing(!following);
      console.log(data);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdate(false);
    }
  };
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={{
                base: "xs",
                md: "sm",
                lg: "md",
              }}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePict && (
            <Avatar
              name={user.name}
              src={user.profilePict}
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
          {!user.profilePict && (
            <Avatar
              name={user.name}
              src="https://bit.ly/broken-link"
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
        </Box>
      </Flex>
      <Text>{user.bio}</Text>
      {currentUser?._id === user._id && (
        <Link to={`/update`}>
          <Button>Update Profile</Button>
        </Link>
      )}
      {currentUser?._id !== user._id && (
        <Button size="sm" onClick={handleFollow} isLoading={update}>
          {following ? "Unfollow" : "follow"}
        </Button>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>

              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyUrl}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb={"3"}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb={"3"}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
