import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import ProfilePageSkeleton from "../components/ProfilePageSkeleton";
import { Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";

const UserPage = () => {
  const [user, setUSer] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [fetchingPost, setFetchingPost] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
        }
        setUSer(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };


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

    getUser();
    getUSerPost();
  }, [username, showToast]);
  if (!user && loading) {
    return <ProfilePageSkeleton />;
  }
  if (!user && !loading) return <h1>User not found</h1>;
  console.log(posts);
  return (
    <>
      <UserHeader user={user} />
      {!fetchingPost && posts.length === 0 && <h1>User has not post</h1>}
      {fetchingPost && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts.map((post)=>(
        <Post key={post._id} post={post} postBy={post.postBy}/>
      ))}
    </>
  );
};

export default UserPage;
