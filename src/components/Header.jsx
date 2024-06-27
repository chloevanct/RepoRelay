import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Avatar, HStack, Text, Button, Image } from "@chakra-ui/react";
import { useUser } from '../hooks/useUser';
import NotificationBell from "../assets/notification-bell.png";

export default function Header() {
  const { currentUser } = useUser();

  return (
    <Box bg="gray.50" shadow="md" borderWidth="1px" borderRadius="lg" p={4}>
      <Flex justifyContent="space-between" alignItems="center" maxW="container.lg" mx="auto">
        <Link to="/home" id="logo-link">
          <Text fontSize="2rem" fontWeight="bold" color="teal.500">
            REPO RELAY
          </Text>
        </Link>
        <HStack spacing={8} alignItems="center">
          <Link to="/home">
            <Text color="gray.700">DASHBOARD</Text>
          </Link>
          <Link to="/home">
            <Text color="gray.700">PROJECT HUB</Text>
          </Link>
          <Link to="/aboutUs">
            <Text color="gray.700">ABOUT US</Text>
          </Link>
          <Link to="/home">
            <Image
              src={NotificationBell}
              alt="Notifications"
              boxSize="1.3rem"
            />
          </Link>
          <Link to="/userProfile">
            <Avatar size="sm" src={currentUser.userImage || ""} />
          </Link>
          <Link to="/post">
            <Button colorScheme="teal" fontWeight='bold'>ADD PROJECT</Button>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}
