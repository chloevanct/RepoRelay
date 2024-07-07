import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Avatar,
  Text,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import Header from "../components/Header";
import Tag from "../components/Tag";
import { TagInput } from "../components/postProject/TagInput";
import { DifficultySelector } from "../components/postProject/DifficultySelector";
import {
  difficultyColorMapping,
  projectColorMapping,
  technologyColorMapping,
} from "../utils/tagColorMappings";
import { useUser } from "../hooks/useUser";

import { useSelector, useDispatch } from "react-redux";

import { getProjectsAsync } from "../redux/projects/projectCardThunks";

import ProjectCard from "../components/projectCards/ProjectCard";

export default function UserProfilePage() {
  const {
    currentUser,
    handleUpdateDifficultyTags,
    handleUpdateProjectTags,
    handleUpdateTechTags,
  } = useUser();

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);

  const [isEditingDifficulty, setIsEditingDifficulty] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isEditingTech, setIsEditingTech] = useState(false);

  const [newDifficultyTags, setNewDifficultyTags] = useState([]);

  const [newProjectTags, setNewProjectTags] = useState([]);
  const [newTechTags, setNewTechTags] = useState([]);
  const [ownedProjects, setOwnedProjects] = useState([]);
  const [subscribedProjects, setSubscribedProjects] = useState([]);

  useEffect(() => {
    dispatch(getProjectsAsync());
  }, [dispatch]);

  useEffect(() => {
    setNewDifficultyTags(currentUser.preferences.difficultyTags);
    setNewProjectTags(currentUser.preferences.projectTags);
    setNewTechTags(currentUser.preferences.techTags);
    setOwnedProjects(
      // projects
      projects.filter((project) =>
        currentUser.ownedProjects.includes(project.projectID)
      )
    );
    setSubscribedProjects(
      projects.filter((project) =>
        currentUser.subscribedProjects.includes(project.projectID)
      )
    );
    // console.log(ownedProjects);
  }, [currentUser, projects]);

  console.log(currentUser);

  const handleSaveDifficulty = () => {
    handleUpdateDifficultyTags(newDifficultyTags);
    setIsEditingDifficulty(false);
  };

  const handleSaveProject = () => {
    handleUpdateProjectTags(newProjectTags);
    setIsEditingProject(false);
  };

  const handleSaveTech = () => {
    handleUpdateTechTags(newTechTags);
    setIsEditingTech(false);
  };

  const handleCancelDifficulty = () => {
    setNewDifficultyTags(currentUser.preferences.difficultyTags);
    setIsEditingDifficulty(false);
  };

  const handleCancelProject = () => {
    setNewProjectTags(currentUser.preferences.projectTags);
    setIsEditingProject(false);
  };

  const handleCancelTech = () => {
    setNewTechTags(currentUser.preferences.techTags);
    setIsEditingTech(false);
  };

  return (
    <>
      <Header />
      <Container maxW="container.lg" width="100%" mt={5}>
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          bg="gray.50"
          width="100%"
          mt={5}
        >
          <Heading as="h3" size="lg" mb={5}>
            User Profile
          </Heading>
          <VStack spacing={4} align="stretch">
            <HStack spacing={4} align="center">
              <Avatar
                size="xl"
                name={`${currentUser.firstName} ${currentUser.lastName}`}
                src={currentUser.userImage}
              />
              <Box>
                <Heading
                  as="h4"
                  size="md"
                >{`${currentUser.firstName} ${currentUser.lastName}`}</Heading>
                <Text>{currentUser.emailAddress}</Text>
                <Text>{`GitHub: ${currentUser.githubUsername}`}</Text>
              </Box>
            </HStack>

            <Box>
              <HStack justifyContent="space-between">
                <Heading as="h4" size="md" mb={2}>
                  Difficulty Preference
                </Heading>
                {isEditingDifficulty ? (
                  <HStack>
                    <Button size="sm" onClick={handleSaveDifficulty}>
                      Save
                    </Button>
                    <Button size="sm" onClick={handleCancelDifficulty}>
                      Cancel
                    </Button>
                  </HStack>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setIsEditingDifficulty(true)}
                  >
                    Edit
                  </Button>
                )}
              </HStack>
              {isEditingDifficulty ? (
                <DifficultySelector
                  id="difficultyTags"
                  label="Difficulty Level"
                  value={newDifficultyTags[0]}
                  onChange={(value) => setNewDifficultyTags([value])}
                  options={Object.keys(difficultyColorMapping)}
                />
              ) : (
                <Wrap spacing={2}>
                  {newDifficultyTags.map((tag, index) => (
                    <WrapItem key={index}>
                      <Tag
                        tagName={tag}
                        colorMapping={difficultyColorMapping}
                      />
                    </WrapItem>
                  ))}
                </Wrap>
              )}
            </Box>

            <Box>
              <HStack justifyContent="space-between">
                <Heading as="h4" size="md" mb={2}>
                  Project Type Preferences
                </Heading>
                {isEditingProject ? (
                  <HStack>
                    <Button size="sm" onClick={handleSaveProject}>
                      Save
                    </Button>
                    <Button size="sm" onClick={handleCancelProject}>
                      Cancel
                    </Button>
                  </HStack>
                ) : (
                  <Button size="sm" onClick={() => setIsEditingProject(true)}>
                    Edit
                  </Button>
                )}
              </HStack>
              {isEditingProject ? (
                <TagInput
                  id="projectTags"
                  label="Project Type Tags"
                  tags={newProjectTags}
                  tagMapping={projectColorMapping}
                  onAdd={(tag) => setNewProjectTags([...newProjectTags, tag])}
                  onRemove={(index) =>
                    setNewProjectTags(
                      newProjectTags.filter((_, i) => i !== index)
                    )
                  }
                  allowMultiple={true}
                />
              ) : (
                <Wrap spacing={2}>
                  {newProjectTags.map((tag, index) => (
                    <WrapItem key={index}>
                      <Tag tagName={tag} colorMapping={projectColorMapping} />
                    </WrapItem>
                  ))}
                </Wrap>
              )}
            </Box>

            <Box>
              <HStack justifyContent="space-between">
                <Heading as="h4" size="md" mb={2}>
                  Technology Preferences
                </Heading>
                {isEditingTech ? (
                  <HStack>
                    <Button size="sm" onClick={handleSaveTech}>
                      Save
                    </Button>
                    <Button size="sm" onClick={handleCancelTech}>
                      Cancel
                    </Button>
                  </HStack>
                ) : (
                  <Button size="sm" onClick={() => setIsEditingTech(true)}>
                    Edit
                  </Button>
                )}
              </HStack>
              {isEditingTech ? (
                <TagInput
                  id="techTags"
                  label="Technology Tags"
                  tags={newTechTags}
                  tagMapping={technologyColorMapping}
                  onAdd={(tag) => setNewTechTags([...newTechTags, tag])}
                  onRemove={(index) =>
                    setNewTechTags(newTechTags.filter((_, i) => i !== index))
                  }
                  allowMultiple={true}
                />
              ) : (
                <Wrap spacing={2}>
                  {newTechTags.map((tag, index) => (
                    <WrapItem key={index}>
                      <Tag
                        tagName={tag}
                        colorMapping={technologyColorMapping}
                      />
                    </WrapItem>
                  ))}
                </Wrap>
              )}
            </Box>

            {/* <Box>
              <Heading as="h4" size="md" mb={2}>
                Owned Projects
              </Heading>
              <VStack align="start">
                {currentUser.ownedProjects.map((projectId, index) => (
                  <Text key={index}>Project ID: {projectId}</Text>
                ))}
              </VStack>
            </Box> */}

            <Box>
              <Heading as="h4" size="md" mb={2}>
                Owned Projects
              </Heading>
              <VStack align="start">
                {ownedProjects.map((project) => (
                  <ProjectCard key={project.projectID} project={project} />
                ))}
              </VStack>
            </Box>

            <Box>
              <Heading as="h4" size="md" mb={2}>
                Subscribed Projects
              </Heading>
              <VStack align="start">
                {subscribedProjects.map((project) => (
                  <ProjectCard key={project.projectID} project={project} />
                ))}
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Container>
    </>
  );
}
