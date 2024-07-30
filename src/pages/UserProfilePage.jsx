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
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Tag from "../components/Tag";
import { TagInput } from "../components/postProject/TagInput";
import { DifficultySelector } from "../components/postProject/DifficultySelector";
import {
  difficultyColorMapping,
  projectColorMapping,
  technologyColorMapping,
} from "../utils/tagColorMappings";
import { updateUserAsync } from "../redux/user/userThunks";
import { setUser } from "../redux/user/userSlice";

export default function UserProfilePage({ onLogout }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userLoading = useSelector((state) => state.user.status === 'pending');

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingDifficulty, setIsEditingDifficulty] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isEditingTech, setIsEditingTech] = useState(false);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUserImage, setNewUserImage] = useState("");

  const [newDifficultyTags, setNewDifficultyTags] = useState([]);
  const [newProjectTags, setNewProjectTags] = useState([]);
  const [newTechTags, setNewTechTags] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setNewFirstName(currentUser.firstName || "");
      setNewLastName(currentUser.lastName || "");
      setNewEmail(currentUser.emailAddress || "");
      setNewUserImage(currentUser.userImage || "");

      setNewDifficultyTags(currentUser.preferences?.difficultyTags || []);
      setNewProjectTags(currentUser.preferences?.projectTags || []);
      setNewTechTags(currentUser.preferences?.techTags || []);
    }
  }, [currentUser]);

  const handleSaveProfile = async () => {
    try {
      const updatedUser = await dispatch(
        updateUserAsync({
          githubUsername: currentUser.githubUsername,
          updateData: {
            firstName: newFirstName,
            lastName: newLastName,
            emailAddress: newEmail,
            userImage: newUserImage,
          },
        })
      ).unwrap();
      dispatch(setUser(updatedUser.currentUser));
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSaveDifficulty = async () => {
    try {
      const updatedUser = await dispatch(
        updateUserAsync({
          githubUsername: currentUser.githubUsername,
          updateData: { "preferences.difficultyTags": newDifficultyTags },
        })
      ).unwrap();
      dispatch(setUser(updatedUser.currentUser));
      setIsEditingDifficulty(false);
    } catch (error) {
      console.error("Error updating difficulty tags:", error);
    }
  };

  const handleSaveProject = async () => {
    try {
      const updatedUser = await dispatch(
        updateUserAsync({
          githubUsername: currentUser.githubUsername,
          updateData: { "preferences.projectTags": newProjectTags },
        })
      ).unwrap();
      dispatch(setUser(updatedUser.currentUser));
      setIsEditingProject(false);
    } catch (error) {
      console.error("Error updating project tags:", error);
    }
  };

  const handleSaveTech = async () => {
    try {
      const updatedUser = await dispatch(
        updateUserAsync({
          githubUsername: currentUser.githubUsername,
          updateData: { "preferences.techTags": newTechTags },
        })
      ).unwrap();
      dispatch(setUser(updatedUser.currentUser));
      setIsEditingTech(false);
    } catch (error) {
      console.error("Error updating tech tags:", error);
    }
  };

  const handleCancelProfile = () => {
    setNewFirstName(currentUser.firstName || "");
    setNewLastName(currentUser.lastName || "");
    setNewEmail(currentUser.emailAddress || "");
    setNewUserImage(currentUser.userImage || "");
    setIsEditingProfile(false);
  };

  const handleCancelDifficulty = () => {
    setNewDifficultyTags(currentUser.preferences?.difficultyTags || []);
    setIsEditingDifficulty(false);
  };

  const handleCancelProject = () => {
    setNewProjectTags(currentUser.preferences?.projectTags || []);
    setIsEditingProject(false);
  };

  const handleCancelTech = () => {
    setNewTechTags(currentUser.preferences?.techTags || []);
    setIsEditingTech(false);
  };

  if (userLoading || !currentUser) {
    return (
      <Container centerContent mt={5}>
        <Spinner size="xl" />
      </Container>
    );
  }

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
          <Button colorScheme="red" onClick={onLogout}>
              Logout
            </Button>
          <VStack spacing={4} align="stretch">
            <HStack spacing={4} align="center">
              <Avatar
                size="xl"
                name={`${currentUser.firstName || ""} ${currentUser.lastName || ""}`}
                src={currentUser.userImage || ""}
              />
              <Box>
                {isEditingProfile ? (
                  <>
                    <Input
                      value={newUserImage}
                      onChange={(e) => setNewUserImage(e.target.value)}
                      placeholder="Image URL"
                      mb={2}
                    />
                    <Input
                      value={newFirstName}
                      onChange={(e) => setNewFirstName(e.target.value)}
                      placeholder="First Name"
                      mb={2}
                    />
                    <Input
                      value={newLastName}
                      onChange={(e) => setNewLastName(e.target.value)}
                      placeholder="Last Name"
                      mb={2}
                    />
                    <Input
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="Email"
                      mb={2}
                    />
                    <HStack>
                      <Button size="sm" onClick={handleSaveProfile}>
                        Save
                      </Button>
                      <Button size="sm" onClick={handleCancelProfile}>
                        Cancel
                      </Button>
                    </HStack>
                  </>
                ) : (
                  <>
                    <Heading
                      as="h4"
                      size="md"
                    >{`${currentUser.firstName || ""} ${currentUser.lastName || ""}`}</Heading>
                    <Text>{currentUser.emailAddress || ""}</Text>
                    <Text>{`GitHub: ${currentUser.githubUsername || ""}`}</Text>
                    <Button
                      size="sm"
                      mt={2}
                      onClick={() => setIsEditingProfile(true)}
                    >
                      Edit Profile
                    </Button>
                  </>
                )}
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
                  value={newDifficultyTags[0] || ""}
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
                  label="Select project tags"
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
                  label="Select tech tags"
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
          </VStack>
        </Box>
      </Container>
    </>
  );
}
