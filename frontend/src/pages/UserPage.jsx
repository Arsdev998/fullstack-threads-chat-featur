import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Box, Flex, SkeletonCircle, SkeletonText, Spinner } from "@chakra-ui/react";
import ProfilePageSkeleton from "../components/ProfilePageSkeleton";

const UserPage = () => {
  const [user, setUSer] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);

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
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username, showToast]);
  if (!user && loading) {
    return (
     <ProfilePageSkeleton/>
    );
  }
  if (!user && !loading) return <h1>User not found</h1>;
  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={1200}
        replies={237}
        image={
          "https://i.pinimg.com/736x/77/ee/52/77ee525a6342edbd5a8722093123020a.jpg"
        }
        desc={"I'm with my best friend"}
      />
      <UserPost
        likes={6909}
        replies={88}
        image={
          "https://i.pinimg.com/564x/9f/16/41/9f16411bfbd2861ace5f74eda6dbb72f.jpg"
        }
        desc={"Casca looked very beautiful at night..."}
      />
      <UserPost
        likes={489}
        replies={58}
        image={
          "https://i.pinimg.com/564x/95/c9/7b/95c97bcbb18783841c4d659263534339.jpg"
        }
        desc={"beautiful night while wailing on the moonlight"}
      />
      <UserPost likes={8999} replies={790} desc={"I hate Griffith"} />
    </>
  );
};

export default UserPage;
