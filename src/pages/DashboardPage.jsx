import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Container, Spinner, Text, Box, Heading, VStack, Button, Divider } from "@chakra-ui/react";
import Header from "../components/Header";
import { selectFilteredProjects } from "../utils/selectors";
import { getProjectsAsync } from "../redux/projects/projectCardThunks";
import { REQUEST_STATE } from "../redux/requestState";
import ProjectCard from "../components/projectCards/ProjectCard";

const getRecommendedProjects = async (userProfile, allProjects) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return allProjects.slice(0, 3);
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
  const [loading, setLoading] = useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [fading, setFading] = useState(false);

  console.log('Current user in DashboardPage:', currentUser);

  useEffect(() => {
    dispatch(getProjectsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && displayedCards.length > 0) {
      const uniqueOwnedProjects = Array.from(
        new Set(displayedCards.filter((project) => currentUser.ownedProjects?.includes(project.projectID)))
      );
      setOwnedProjects(uniqueOwnedProjects);

      const uniqueSubscribedProjects = Array.from(
        new Set(displayedCards.filter((project) => currentUser.subscribedProjects?.includes(project.projectID)))
      );
      setSubscribedProjects(uniqueSubscribedProjects);

      getRecommendedProjects(currentUser, displayedCards).then((projects) => {
        const uniqueRecommendedProjects = Array.from(new Set(projects));
        setRecommendedProjects(uniqueRecommendedProjects);
        setLoading(false);
      });
    }
  }, [currentUser, displayedCards]);

  useEffect(() => {
    if (ownedProjects.length > 0) {
      console.log("Owned Projects Keys:", ownedProjects.map((project) => project.projectID));
    }
    if (subscribedProjects.length > 0) {
      console.log("Subscribed Projects Keys:", subscribedProjects.map((project) => project.projectID));
    }
    if (recommendedProjects.length > 0) {
      console.log("Recommended Projects Keys:", recommendedProjects.map((project) => project.projectID));
    }
  }, [ownedProjects, subscribedProjects, recommendedProjects]);

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
