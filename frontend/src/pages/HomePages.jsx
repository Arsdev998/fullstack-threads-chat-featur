import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const HomePages = () => {
  return (
    <Link to={"/guts"}>
      <Flex w={"full"} justifyContent={"center"}>
        <Button mx={"auto"}>Visit profile page</Button>
      </Flex>
    </Link>
  );
};

export default HomePages;
