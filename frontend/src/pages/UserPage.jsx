import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import ProfilePageSkeleton from "../components/ProfilePageSkeleton";
import { Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [fetchingPost, setFetchingPost] = useState(true);

  useEffect(() => {
    const getUSerPost = async () => {
      setFetchingPost(true);
      try {
        const res = await fetch(`/api/post/user/${username}`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPost(false);
      }
    };

    getUSerPost();
  }, [username, showToast, setPosts]);

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  if (!user && loading) {
    return <ProfilePageSkeleton />;
  }
  if (!user && !loading) return <h1>User not found</h1>;
  return (
    <>
      <UserHeader user={user} />
      {!fetchingPost && posts.length === 0 && <h1>User has not post</h1>}
      {fetchingPost && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          postBy={post.postBy}
        />
      ))}
    </>
  );
};

export default UserPage;
