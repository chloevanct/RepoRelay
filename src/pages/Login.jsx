import React from "react";
import { Button, Heading, Text, Flex, Image, Divider } from "@chakra-ui/react";

import RelayImg from "../assets/relay.jpeg";
import CodingImg from "../assets/coding.jpeg";
import GlobalConnection from "../assets/global-connection.jpeg";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const REDIRECT_URI = `${serverUrl}/oauth/callback`;

function loginWithGithub() {
  window.location.assign(
    `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  );
}

/**
 * Login component that provides a login interface for users to authenticate with GitHub.
 * The login button initiates the OAuth flow by redirecting the user to GitHub's authorization page.
 * 
 * @returns {JSX.Element} The rendered Login page with a welcome message and GitHub login button.
 */ 
export default function Login() {
  return (
    <Flex direction="column">
      <Flex direction="column" align="center" pb="20px" pt="10px">
        <Image src={RelayImg} alt="Relay Image" width="40%" pb="10px" />
        <Heading size={["lg", "xl"]} pb="5px">
          Grow your portfolio with Repo Relay
        </Heading>
        <Text pb="10px">
          Share your unfinished coding projects with the community, or
          contribute to existing ones
        </Text>
        <Button colorScheme="teal" size="lg" onClick={loginWithGithub}>
            Login with GitHub
        </Button>
      </Flex>
      <Divider alignSelf="center" width="90%" />
      <Flex justify="center" gap="20px" pt="20px" pb="20px">
        <Flex
          direction="column"
          width={["80%", "40%"]}
          textAlign={["center", "left"]}
        >
          <Heading size={["md", "lg"]} pb="5px">
            Advance and expand your skillset
          </Heading>
          <Text>
            Build on your existing skills by taking on new projects with
            familiar technologies, or challenge yourself by trying something
            new.
          </Text>
        </Flex>
        <Image src={CodingImg} alt="Coding" width={["40%", "40%"]} />
      </Flex>
      <Divider alignSelf="center" width="90%" />
      <Flex justify="center" gap="20px" pt="20px" pb="20px">
        <Image
          src={GlobalConnection}
          alt="Global Connection"
          width={["40%", "40%"]}
        />
        <Flex
          direction="column"
          width={["80%", "40%"]}
          textAlign={["center", "left"]}
        >
          <Heading size={["md", "lg"]} pb="5px">
            Collaborate with a diverse, global coding community
          </Heading>
          <Text>
            Get access to an active community of developers of all skill levels
            and backgrounds.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
