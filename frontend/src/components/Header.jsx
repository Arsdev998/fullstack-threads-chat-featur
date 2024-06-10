import { Avatar, Flex, Image, useColorMode } from "@chakra-ui/react";
import React from "react";
import userAtom from "../atoms/userAtom";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { useRecoilValue } from "recoil";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom)
  return (
    <Flex justifyContent={"space-between"} alignItems={'center'} mt={6} mb="12">
    {user && (
      <Link to={'/'}>
        <GoHomeFill size={24}/>
      </Link>
    )}
      <Image
        cursor={"pointer"}
        alt="threads-Logo"
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
      {user && (
      <Link to={`/${user.username}`}>
       <Avatar style={{width:'24px', height:'24px'}} src={user.profilePict}/>
      </Link>
    )}
    </Flex>
  );
};

export default Header;
