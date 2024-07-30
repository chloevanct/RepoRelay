import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Container, Spinner, Text, Box, Heading, VStack, Button, Divider } from "@chakra-ui/react";
import Header from "../components/Header";
import { selectFilteredProjects } from "../utils/selectors";
import { getProjectsAsync } from "../redux/projects/projectCardThunks";
import { REQUEST_STATE } from "../redux/requestState";
import { fetchUserAsync } from "../redux/user/userThunks";
import ProjectCard from "../components/projectCards/ProjectCard";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
export const API_BASE_URL = `${serverUrl}/projects`;

const getRecommendedProjects = async (githubUsername) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations/${githubUsername}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching recommended projects: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recommended projects:", error);
    return [];
  }
};

export default function DashboardPage() {
  const dispatch = useDispatch();
  const displayedCards = useSelector(selectFilteredProjects);
  const getProjectsStatus = useSelector((state) => state.projects.getProjects);
  const error = useSelector((state) => state.projects.error);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [ownedProjects, setOwnedProjects] = useState([]);
  const [subscribedProjects, setSubscribedProjects] = useState([]);
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [loadingRecommended, setLoadingRecommended] = useState(true);
  const [loadingOwned, setLoadingOwned] = useState(true);
  const [loadingSubscribed, setLoadingSubscribed] = useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserAsync(token));
    }
  }, []);

  useEffect(() => {
    dispatch(getProjectsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && displayedCards.length > 0) {
      const uniqueOwnedProjects = displayedCards.filter((project) =>
        currentUser.ownedProjects?.includes(project.projectID)
      );
      setOwnedProjects(uniqueOwnedProjects);
      setLoadingOwned(false);

      const uniqueSubscribedProjects = displayedCards.filter((project) =>
        currentUser.subscribedProjects?.includes(project.projectID)
      );
      setSubscribedProjects(uniqueSubscribedProjects);
      setLoadingSubscribed(false);
    }
  }, [currentUser, displayedCards]);

  useEffect(() => {
    if (currentUser && displayedCards.length > 0) {
      getRecommendedProjects(currentUser.githubUsername).then((projects) => {
        setRecommendedProjects(projects);
        setLoadingRecommended(false);
      });
    }
  }, [currentUser, displayedCards]);

  if (getProjectsStatus === REQUEST_STATE.REJECTED) {
    return <Text>Error: {error}</Text>;
  }

  const handlePreviousClick = () => {
    setFading(true);
    setTimeout(() => {
      setCurrentProjectIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : recommendedProjects.length - 1
      );
      setFading(false);
    }, 500);
  };

  const handleNextClick = () => {
    setFading(true);
    setTimeout(() => {
      setCurrentProjectIndex((prevIndex) =>
        prevIndex < recommendedProjects.length - 1 ? prevIndex + 1 : 0
      );
      setFading(false);
    }, 500);
  };

  return (
    <>
      <Header />
      <Container maxW="container.lg" width="100%" mt={5}>
        <Flex direction="column" width="100%">
          <Box p={5} width="100%">
            <Heading as="h3" size="lg" mb={5}>
              Recommended Projects
            </Heading>
            <Text fontSize="lg" mb={5}>
              Based on your preferences, we think you might enjoy these 3 projects!
            </Text>
            {loadingRecommended ? (
              <Spinner />
            ) : (
              <Flex direction="column" align="center">
                <Box
                  position="relative"
                  width="100%"
                  opacity={fading ? 0 : 1}
                  transition="opacity 0.3s ease-in-out"
                >
                  <ProjectCard project={recommendedProjects[currentProjectIndex]} />
                </Box>
                <Flex mt={4}>
                  <Button onClick={handlePreviousClick} mr={4}>Previous Project</Button>
                  <Button onClick={handleNextClick}>Next Project</Button>
                </Flex>
              </Flex>
            )}
          </Box>
          <Divider my={8} />
          <Box p={5} width="100%">
            <Heading as="h3" size="lg" mb={5}>
              Owned Projects
            </Heading>
            {loadingOwned ? (
              <Spinner />
            ) : ownedProjects.length === 0 ? (
              <Text pt="20px">No owned projects available.</Text>
            ) : (
              <VStack align="start">
                {ownedProjects.map((project) => (
                  <ProjectCard key={project.projectID} project={project} />
                ))}
              </VStack>
            )}
          </Box>
          <Divider my={8} />
          <Box p={5} width="100%">
            <Heading as="h3" size="lg" mb={5}>
              Subscribed Projects
            </Heading>
            {loadingSubscribed ? (
              <Spinner />
            ) : subscribedProjects.length === 0 ? (
              <Text pt="20px">No subscribed projects available.</Text>
            ) : (
              <VStack align="start">
                {subscribedProjects.map((project) => (
                  <ProjectCard key={project.projectID} project={project} />
                ))}
              </VStack>
            )}
          </Box>
        </Flex>
      </Container>
    </>
  );
}
