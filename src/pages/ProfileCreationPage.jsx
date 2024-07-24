import React, { useState } from "react";
import { Box, Container, Heading, VStack, HStack, Avatar, Input, Button, useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserAsync, updateUserAsync } from "../redux/user/userThunks"; // Import the thunks

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export default function ProfileCreationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const githubData = location.state?.githubData || {};

  const [firstName, setFirstName] = useState(githubData.firstName || "");
  const [lastName, setLastName] = useState(githubData.lastName || "");
  const [email, setEmail] = useState(githubData.emailAddress || "");
  const [userImage, setUserImage] = useState(githubData.userImage || "");
  const [difficultyTags, setDifficultyTags] = useState([]);
  const [projectTags, setProjectTags] = useState([]);
  const [techTags, setTechTags] = useState([]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "Authentication token not found.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const newUser = {
      githubUsername: githubData.githubUsername,
      firstName,
      lastName,
      userImage,
      emailAddress: email,
      preferences: {
        difficultyTags,
        projectTags,
        techTags,
      },
    };

    try {
      let response;
      if (githubData.isNewUser) {
        response = await dispatch(createUserAsync(token)).unwrap();
      } else {
        response = await dispatch(updateUserAsync({
          githubUsername: githubData.githubUsername,
          updateData: newUser
        })).unwrap();
      }

      dispatch(updateUserAsync({
        githubUsername: githubData.githubUsername,
        updateData: newUser
      })).unwrap();

      if (response) {
        toast({
          title: "Profile created.",
          description: "Your profile has been successfully created.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        navigate("/home");
      } else {
        console.error("Failed to save profile:", response.statusText);
        toast({
          title: "Error",
          description: "Failed to save profile.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Error saving profile.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Container maxW="container.lg" mt={5}>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="gray.50">
        <Heading as="h3" size="lg" mb={5}>
          Profile Creation
        </Heading>
        <VStack spacing={4} align="stretch">
          <HStack spacing={4} align="center">
            <Avatar size="xl" src={userImage} />
            <Box>
              <Input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                mt={2}
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mt={2}
              />
              <Input
                placeholder="Profile Image URL"
                value={userImage}
                onChange={(e) => setUserImage(e.target.value)}
                mt={2}
              />
            </Box>
          </HStack>
          {/* Add other fields for difficultyTags, projectTags, techTags */}
          <Button colorScheme="teal" onClick={handleSave}>
            Save Profile
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}
