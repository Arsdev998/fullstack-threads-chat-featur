import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

const ProfilePageSkeleton = () => {
  return (
    <Box
      padding="6"
      boxShadow="lg"
      bg="transparent"
      w="full"
      maxW="container.lg"
      mx="auto"
    >
      <Flex justify="space-between" align="center">
        <Box flex="1" ml="4">
          <SkeletonText
            noOfLines={1}
            spacing="4"
            ske
            skeletonHeight="4"
            width="50%"
          />
          <SkeletonText
            noOfLines={1}
            spacing="4"
            ske
            skeletonHeight="4"
            width="50%"
            mt="2"
          />
        </Box>
        <SkeletonCircle size="24" />
      </Flex>
      <Skeleton mt="4" height="20px" width="50%" />
      <Skeleton mt="2" height="30px" width="25%" />
      <Flex justify="space-between" mt="4">
        <Flex gap={2}>
          <Skeleton height="40px" width="80px" />
          <Skeleton height="40px" width="80px" />
        </Flex>
        <Flex gap={2}>
          <Skeleton height="30px" width="30px" />
          <Skeleton height="30px" width="30px" />
        </Flex>
      </Flex>
      <Flex justify="space-around" mt="4">
        <Skeleton height="40px" width="100px" />
        <Skeleton height="40px" width="100px" />
      </Flex>
    </Box>
  );
};

export default ProfilePageSkeleton;
