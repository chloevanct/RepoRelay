import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NotificationBell from "../assets/notification-bell.png";

export default function Header() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Box bg="gray.50" shadow="md" borderWidth="1px" borderRadius="lg" p={[2, 4]}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mx="auto"
      >
        <Link to="/home" id="logo-link">
          <Text fontWeight="bold" color="teal.500" fontSize={['0.5rem', '0.6rem', '1.1rem', '1.75rem', '2rem']}
          >
            REPO RELAY
          </Text>
        </Link>
        <HStack spacing={[1.5, 3, 4, 5, 7]} alignItems="center">
          <Link to="/home">
            <Text color="gray.700" fontSize={['0.45rem', '0.5rem', '1.2rem']}>
              DASHBOARD
            </Text>
          </Link>
          <Link to="/home">
            <Text color="gray.700" fontSize={['0.45rem', '0.5rem', '1.2rem']}>
              PROJECT HUB
            </Text>
          </Link>
          <Link to="/aboutUs">
            <Text color="gray.700" fontSize={['0.45rem', '0.5rem', '1.2rem']}>
              ABOUT US
            </Text>
          </Link>
          <Link to="/home">
            <Avatar
              src={NotificationBell}
              alt="Notifications"
              size={["xs", "sm", "md"]}
            />
          </Link>
          <Link to="/userProfile">
            <Avatar size={["xs", "sm", "md"]} src={currentUser?.userImage || ""} />
          </Link>
          <Link to="/post">
            <Button colorScheme="teal" fontWeight="bold" fontSize={['0.45rem', '0.45rem', '1.2rem']} px={[1, 1, 5]}
            >
              ADD PROJECT
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}
