import React from "react";
import { Box, Button, Container, Heading, VStack, Text } from "@chakra-ui/react";

const CLIENT_ID = "Ov23li1yHM1QOlk2RKrV";
const REDIRECT_URI = "http://localhost:3000/oauth/callback";

function loginWithGithub() {
  window.location.assign(
    `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  );
}

const Login = () => {
  return (
    <Container maxW="container.sm" centerContent mt={10}>
      <Box p={8} shadow="md" borderWidth="1px" borderRadius="lg" bg="gray.50" width="100%" textAlign="center">
        <Heading as="h1" size="xl" mb={4} color="teal.500">
          Welcome to Repo Relay
        </Heading>
        <Text fontSize="md" mb={6} color="gray.700">
          Repo Relay is a web app for developers to publish, find, and collaborate on unfinished coding projects, enhancing their skills and expanding their portfolio.
        </Text>
        <VStack spacing={4}>
          <Button colorScheme="teal" size="lg" onClick={loginWithGithub}>
            Login with GitHub
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;
