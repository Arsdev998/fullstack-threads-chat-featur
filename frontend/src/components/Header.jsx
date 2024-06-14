import { Avatar, Button, Flex, Image, useColorMode } from "@chakra-ui/react";
import React from "react";
import userAtom from "../atoms/userAtom";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();

  const setAuthScreen = useSetRecoilState(authScreenAtom);
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} mt={6} mb="12">
      {user && (
        <Link to={"/"}>
          <GoHomeFill size={24} />
        </Link>
      )}
      {!user && <Link onClick={() => setAuthScreen("login")}>Login</Link>}
      <Image
        cursor={"pointer"}
        alt="threads-Logo"
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
      {user && (
        <Flex alignItems={"center"} gap={4}>
          <Link to={`/${user.username}`}>
            <Avatar
              style={{ width: "24px", height: "24px" }}
              src={user.profilePict}
            />
          </Link>
          <Button size={"xs"} onClick={logout}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}
      {!user && <Link onClick={() => setAuthScreen("signup")}>signup</Link>}
    </Flex>
  );
};

export default Header;
