import { Flex } from "@chakra-ui/layout";
import {  Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const HomePages = () => {
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();
  useEffect(() => {
    const getFeedPost = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/post/feed");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
        }
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPost();
  }, [showToast,setPosts]);
  return (
    <>
      {loading && (
        <Flex justify="center">
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!loading && posts.length === 0 &&(
        <h1>Please follow some user</h1>
      )}
      {
        posts.map((post)=>(
          <Post key={post._id} post={post} postBy={post.postBy}/>
        ))
      }
    </>
  );
};

export default HomePages;
