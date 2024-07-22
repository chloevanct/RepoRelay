import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Container, Spinner, Text, Box, Heading, VStack, Button, Divider } from "@chakra-ui/react";
import Header from "../components/Header";
import { selectFilteredProjects } from "../utils/selectors";
import { getProjectsAsync } from "../redux/projects/projectCardThunks";
import { REQUEST_STATE } from "../redux/requestState";
import ProjectCard from "../components/projectCards/ProjectCard";
import { useUser } from "../hooks/useUser";

// Mock function to simulate an API call to a ML model
const getRecommendedProjects = async (userProfile, allProjects) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // For now, return the first three projects as the "recommended" projects
  return allProjects.slice(0, 3);
};

export default function DashboardPage() {
  const dispatch = useDispatch();
  const displayedCards = useSelector(selectFilteredProjects);
  const getProjectsStatus = useSelector((state) => state.projects.getProjects);
  const error = useSelector((state) => state.projects.error);

  const { currentUser } = useUser();
  const [ownedProjects, setOwnedProjects] = useState([]);
  const [subscribedProjects, setSubscribedProjects] = useState([]);
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    dispatch(getProjectsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && displayedCards.length > 0) {
      setOwnedProjects(
        displayedCards.filter((project) =>
          currentUser.ownedProjects.includes(project.projectID)
        )
      );
      setSubscribedProjects(
        displayedCards.filter((project) =>
          currentUser.subscribedProjects.includes(project.projectID)
        )
      );
      getRecommendedProjects(currentUser, displayedCards).then((projects) => {
        setRecommendedProjects(projects);
        setLoading(false);
      });
    }
  }, [currentUser, displayedCards]);

  if (getProjectsStatus === REQUEST_STATE.REJECTED) {
    return <Text>Error: {error}</Text>;
  }

  const handlePreviousClick = () => {
    setFading(true);
    setTimeout(() => {
      setCurrentProjectIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : recommendedProjects.length - 1));
      setFading(false);
    }, 500);
  };

  const handleNextClick = () => {
    setFading(true);
    setTimeout(() => {
      setCurrentProjectIndex((prevIndex) => (prevIndex < recommendedProjects.length - 1 ? prevIndex + 1 : 0));
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
            {loading ? (
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
            {ownedProjects.length === 0 ? (
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
            {subscribedProjects.length === 0 ? (
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
